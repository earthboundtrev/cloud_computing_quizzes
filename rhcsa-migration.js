/**
 * One-time migration script: rhcsa9 → rhcsa10
 * Migrates localStorage study_sessions_profile_rhcsa9 → rhcsa10, merges data if target exists,
 * removes retired topics, and updates quizCompleted.
 * 
 * Idempotent: safe to run on every page load.
 */
(function migrateRHCSA9toRHCSA10() {
  'use strict';
  
  const MIGRATION_FLAG = 'rhcsa_migrated_to_v10_2';
  const OLD_PROFILE_KEY = 'study_sessions_profile_rhcsa9';
  const NEW_PROFILE_KEY = 'study_sessions_profile_rhcsa10';
  const QUIZ_COMPLETED_KEY = 'quizCompleted';
  const QUIZ_ORDER_KEY = 'quizOrder';
  
  // Retired topics that don't exist in rhcsa10
  const RETIRED_TOPICS = ['RHEL 9 vs 7', 'Containers'];
  
  // Check if already migrated
  if (localStorage.getItem(MIGRATION_FLAG)) {
    return;  // Already migrated
  }
  
  console.log('[Migration] Starting rhcsa9 → rhcsa10 migration...');
  
  var migratedProfile = false;
  var migratedCompleted = false;
  var migratedOrder = false;
  
  // Migrate study_sessions_profile_rhcsa9 → rhcsa10
  try {
    var oldProfileStr = localStorage.getItem(OLD_PROFILE_KEY);
    if (oldProfileStr) {
      var oldProfile = JSON.parse(oldProfileStr);
      var newProfileStr = localStorage.getItem(NEW_PROFILE_KEY);
      var newProfile = newProfileStr ? JSON.parse(newProfileStr) : null;
      
      // If new profile doesn't exist, create it from old profile
      if (!newProfile) {
        newProfile = {
          quizId: 'rhcsa10',
          topicStats: {},
          topicMissesFromImports: {}
        };
      }
      
      // Merge topicStats, excluding retired topics
      if (oldProfile.topicStats) {
        Object.keys(oldProfile.topicStats).forEach(function(topic) {
          if (RETIRED_TOPICS.indexOf(topic) === -1) {
            // Keep existing stats if they exist, otherwise copy from old
            if (!newProfile.topicStats[topic]) {
              newProfile.topicStats[topic] = oldProfile.topicStats[topic];
            }
          }
        });
      }
      
      // Merge topicMissesFromImports, excluding retired topics
      if (oldProfile.topicMissesFromImports) {
        Object.keys(oldProfile.topicMissesFromImports).forEach(function(topic) {
          if (RETIRED_TOPICS.indexOf(topic) === -1) {
            // Keep existing misses if they exist, otherwise copy from old
            if (!newProfile.topicMissesFromImports[topic]) {
              newProfile.topicMissesFromImports[topic] = oldProfile.topicMissesFromImports[topic];
            }
          }
        });
      }
      
      // Save the merged profile
      var savedProfileStr = JSON.stringify(newProfile);
      localStorage.setItem(NEW_PROFILE_KEY, savedProfileStr);
      
      // Verify the copy by reading it back and parsing it
      var verifyStr = localStorage.getItem(NEW_PROFILE_KEY);
      if (verifyStr === savedProfileStr) {
        migratedProfile = true;
        console.log('[Migration] Migrated study_sessions_profile_rhcsa9 → rhcsa10 (retired topics removed)');
      } else {
        console.error('[Migration] Failed to verify profile copy');
        return;  // Don't set migration flag if verification failed
      }
    }
  } catch (e) {
    console.error('[Migration] Failed to migrate profile:', e);
    return;  // Don't set migration flag if migration failed
  }
  
  // Migrate quizCompleted: replace rhcsa9 with rhcsa10
  try {
    var completedStr = localStorage.getItem(QUIZ_COMPLETED_KEY);
    if (completedStr) {
      var completed = JSON.parse(completedStr);
      if (Array.isArray(completed)) {
        var hasRhcsa9 = completed.indexOf('rhcsa9') !== -1;
        var hasRhcsa10 = completed.indexOf('rhcsa10') !== -1;
        
        if (hasRhcsa9 && !hasRhcsa10) {
          // Replace rhcsa9 with rhcsa10
          completed = completed.map(function(id) {
            return id === 'rhcsa9' ? 'rhcsa10' : id;
          });
          localStorage.setItem(QUIZ_COMPLETED_KEY, JSON.stringify(completed));
          migratedCompleted = true;
          console.log('[Migration] Replaced rhcsa9 with rhcsa10 in quizCompleted');
        } else if (hasRhcsa9 && hasRhcsa10) {
          // Both exist, remove rhcsa9
          completed = completed.filter(function(id) { return id !== 'rhcsa9'; });
          localStorage.setItem(QUIZ_COMPLETED_KEY, JSON.stringify(completed));
          migratedCompleted = true;
          console.log('[Migration] Removed rhcsa9 from quizCompleted (rhcsa10 already exists)');
        }
      }
    }
  } catch (e) {
    console.error('[Migration] Failed to migrate quizCompleted:', e);
    // Continue to try quiz order migration
  }
  
  // Migrate quiz order: replace rhcsa9 with rhcsa10
  try {
    var quizOrderStr = localStorage.getItem(QUIZ_ORDER_KEY);
    if (quizOrderStr) {
      var quizOrder = JSON.parse(quizOrderStr);
      if (Array.isArray(quizOrder)) {
        var updated = quizOrder.map(function(id) {
          return id === 'rhcsa9' ? 'rhcsa10' : id;
        });
        localStorage.setItem(QUIZ_ORDER_KEY, JSON.stringify(updated));
        migratedOrder = true;
        console.log('[Migration] Updated quiz order');
      }
    }
  } catch (e) {
    console.error('[Migration] Failed to migrate quizOrder:', e);
    // Continue to set migration flag
  }
  
  // Mark migration complete
  localStorage.setItem(MIGRATION_FLAG, 'true');
  
  console.log('[Migration] Complete! Profile:', migratedProfile, ', Completed:', migratedCompleted, ', Order:', migratedOrder);
  console.log('[Migration] Old rhcsa9 data preserved. Remove manually if desired.');
})();
