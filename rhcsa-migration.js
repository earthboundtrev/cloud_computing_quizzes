/**
 * One-time migration script: rhcsa9 → rhcsa10
 * Migrates localStorage progress, mistakes, stats, and quiz order
 * 
 * Add this inline in rhcsa10_quiz.html or app-reset.js, runs once at page load
 */
(function migrateRHCSA9toRHCSA10() {
  'use strict';
  
  const MIGRATION_FLAG = 'rhcsa_migrated_to_v10';
  
  // Check if already migrated
  if (localStorage.getItem(MIGRATION_FLAG)) {
    return;  // Already migrated
  }
  
  console.log('[Migration] Starting rhcsa9 → rhcsa10 migration...');
  
  const oldPrefix = 'rhcsa9';
  const newPrefix = 'rhcsa10';
  
  // Keys to migrate
  const keysToMigrate = [
    'progress',
    'mistakes',
    'stats',
    'readinessHistory',
    'lastSession',
    'streak',
    'totalAnswered'
  ];
  
  let migratedCount = 0;
  
  keysToMigrate.forEach(function(key) {
    const oldKey = oldPrefix + '_' + key;
    const newKey = newPrefix + '_' + key;
    
    const oldValue = localStorage.getItem(oldKey);
    if (oldValue) {
      try {
        // Copy to new key
        localStorage.setItem(newKey, oldValue);
        migratedCount++;
        console.log('[Migration] Migrated:', oldKey, '→', newKey);
      } catch (e) {
        console.error('[Migration] Failed to migrate', oldKey, e);
      }
    }
  });
  
  // Migrate quiz order in quizOrder key
  try {
    const quizOrderStr = localStorage.getItem('quizOrder');
    if (quizOrderStr) {
      const quizOrder = JSON.parse(quizOrderStr);
      const updated = quizOrder.map(function(id) {
        return id === 'rhcsa9' ? 'rhcsa10' : id;
      });
      localStorage.setItem('quizOrder', JSON.stringify(updated));
      console.log('[Migration] Updated quiz order');
    }
  } catch (e) {
    console.error('[Migration] Failed to migrate quizOrder', e);
  }
  
  // Mark migration complete
  localStorage.setItem(MIGRATION_FLAG, 'true');
  
  console.log('[Migration] Complete! Migrated', migratedCount, 'keys.');
  console.log('[Migration] Old rhcsa9 data preserved. Remove manually if desired.');
})();
