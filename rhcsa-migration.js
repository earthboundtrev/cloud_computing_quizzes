/**
 * One-time migration script: rhcsa9 → rhcsa10
 * Merges localStorage study_sessions_profile_rhcsa9 into rhcsa10 (sum stats), updates quizCompleted.
 *
 * Idempotent: flag rhcsa_migrated_to_v10_3. See GitHub #41.
 */
(function migrateRHCSA9toRHCSA10() {
  'use strict';

  const MIGRATION_FLAG = 'rhcsa_migrated_to_v10_3';
  const LEGACY_FLAG_V2 = 'rhcsa_migrated_to_v10_2';
  const OLD_PROFILE_KEY = 'study_sessions_profile_rhcsa9';
  const NEW_PROFILE_KEY = 'study_sessions_profile_rhcsa10';
  const QUIZ_COMPLETED_KEY = 'quizCompleted';
  const QUIZ_ORDER_KEY = 'quizOrder';

  const RETIRED_TOPICS = ['RHEL 9 vs 7', 'Containers'];

  if (localStorage.getItem(MIGRATION_FLAG)) {
    return;
  }

  console.log('[Migration] Starting rhcsa9 → rhcsa10 merge (v10_3)...');

  var migratedProfile = false;
  var migratedCompleted = false;
  var migratedOrder = false;

  function sumTopicStats(a, b) {
    return {
      correct: (a.correct || 0) + (b.correct || 0),
      total: (a.total || 0) + (b.total || 0)
    };
  }

  function missCount(value) {
    if (typeof value === 'number' && !isNaN(value)) {
      return value;
    }
    if (Array.isArray(value)) {
      return value.length;
    }
    return 0;
  }

  function sumMissCounts(a, b) {
    return missCount(a) + missCount(b);
  }

  try {
    var oldProfileStr = localStorage.getItem(OLD_PROFILE_KEY);
    if (oldProfileStr) {
      var oldProfile;
      try {
        oldProfile = JSON.parse(oldProfileStr);
      } catch (parseErr) {
        console.error('[Migration] Invalid rhcsa9 profile JSON:', parseErr);
        return;
      }

      var newProfileStr = localStorage.getItem(NEW_PROFILE_KEY);
      var newProfile = newProfileStr ? JSON.parse(newProfileStr) : null;

      if (!newProfile) {
        newProfile = {
          quizId: 'rhcsa10',
          topicStats: {},
          topicMissesFromImports: {},
          mergedFrom: []
        };
      }

      if (!newProfile.topicStats || typeof newProfile.topicStats !== 'object') {
        newProfile.topicStats = {};
      }
      if (!newProfile.topicMissesFromImports || typeof newProfile.topicMissesFromImports !== 'object') {
        newProfile.topicMissesFromImports = {};
      }
      if (!Array.isArray(newProfile.mergedFrom)) {
        newProfile.mergedFrom = [];
      }

      var v10_2Ran = localStorage.getItem(LEGACY_FLAG_V2) === 'true';

      if (!oldProfile.topicStats || typeof oldProfile.topicStats !== 'object') {
        oldProfile.topicStats = {};
      }
      if (!oldProfile.topicMissesFromImports || typeof oldProfile.topicMissesFromImports !== 'object') {
        oldProfile.topicMissesFromImports = {};
      }

      var alreadyMergedRhcsa9 = newProfile.mergedFrom.indexOf('rhcsa9') !== -1;

      if (!alreadyMergedRhcsa9) {
        if (oldProfile.topicStats) {
          Object.keys(oldProfile.topicStats).forEach(function (topic) {
            if (RETIRED_TOPICS.indexOf(topic) !== -1) {
              return;
            }
            var oldStat = oldProfile.topicStats[topic];
            if (newProfile.topicStats[topic]) {
              newProfile.topicStats[topic] = sumTopicStats(newProfile.topicStats[topic], oldStat);
            } else if (!v10_2Ran) {
              newProfile.topicStats[topic] = oldStat;
            }
          });
        }

        if (oldProfile.topicMissesFromImports) {
          Object.keys(oldProfile.topicMissesFromImports).forEach(function (topic) {
            if (RETIRED_TOPICS.indexOf(topic) !== -1) {
              return;
            }
            var oldMiss = oldProfile.topicMissesFromImports[topic];
            var hasNewMiss = newProfile.topicMissesFromImports[topic] !== undefined &&
              newProfile.topicMissesFromImports[topic] !== null;
            if (hasNewMiss) {
              newProfile.topicMissesFromImports[topic] = sumMissCounts(
                newProfile.topicMissesFromImports[topic],
                oldMiss
              );
            } else if (!v10_2Ran) {
              newProfile.topicMissesFromImports[topic] = missCount(oldMiss);
            }
          });
        }

        if (newProfile.mergedFrom.indexOf('rhcsa9') === -1) {
          newProfile.mergedFrom.push('rhcsa9');
        }
      }

      var savedProfileStr = JSON.stringify(newProfile);
      try {
        localStorage.setItem(NEW_PROFILE_KEY, savedProfileStr);
      } catch (writeErr) {
        console.error('[Migration] Failed to write rhcsa10 profile:', writeErr);
        return;
      }

      var verifyStr = localStorage.getItem(NEW_PROFILE_KEY);
      if (verifyStr === savedProfileStr) {
        migratedProfile = true;
        console.log('[Migration] Merged study_sessions_profile_rhcsa9 → rhcsa10 (sum stats)');
      } else {
        console.error('[Migration] Failed to verify profile write');
        return;
      }
    }
  } catch (e) {
    console.error('[Migration] Failed to migrate profile:', e);
    return;
  }

  try {
    var completedStr = localStorage.getItem(QUIZ_COMPLETED_KEY);
    if (completedStr) {
      var completed = JSON.parse(completedStr);
      if (Array.isArray(completed)) {
        var hasRhcsa9 = completed.indexOf('rhcsa9') !== -1;
        var hasRhcsa10 = completed.indexOf('rhcsa10') !== -1;

        if (hasRhcsa9 && !hasRhcsa10) {
          completed = completed.map(function (id) {
            return id === 'rhcsa9' ? 'rhcsa10' : id;
          });
          localStorage.setItem(QUIZ_COMPLETED_KEY, JSON.stringify(completed));
          migratedCompleted = true;
        } else if (hasRhcsa9 && hasRhcsa10) {
          completed = completed.filter(function (id) {
            return id !== 'rhcsa9';
          });
          localStorage.setItem(QUIZ_COMPLETED_KEY, JSON.stringify(completed));
          migratedCompleted = true;
        }
      }
    }
  } catch (e) {
    console.error('[Migration] Failed to migrate quizCompleted:', e);
  }

  try {
    var quizOrderStr = localStorage.getItem(QUIZ_ORDER_KEY);
    if (quizOrderStr) {
      var quizOrder = JSON.parse(quizOrderStr);
      if (Array.isArray(quizOrder)) {
        var updated = quizOrder.map(function (id) {
          return id === 'rhcsa9' ? 'rhcsa10' : id;
        });
        localStorage.setItem(QUIZ_ORDER_KEY, JSON.stringify(updated));
        migratedOrder = true;
      }
    }
  } catch (e) {
    console.error('[Migration] Failed to migrate quizOrder:', e);
  }

  if (migratedProfile || !localStorage.getItem(OLD_PROFILE_KEY)) {
    localStorage.setItem(MIGRATION_FLAG, 'true');
  } else if (migratedCompleted || migratedOrder) {
    localStorage.setItem(MIGRATION_FLAG, 'true');
  }

  console.log('[Migration] Complete! Profile:', migratedProfile, ', Completed:', migratedCompleted, ', Order:', migratedOrder);
  console.log('[Migration] Old rhcsa9 data preserved. Remove manually if desired.');
})();
