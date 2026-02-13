/**
 * Cloud Cram – simple offline-first service worker.
 * Precaches all pages and scripts; serves from cache when available (offline or on).
 */
'use strict';

const CACHE_NAME = 'cloudcram-v2';

const PRECACHE_PATHS = [
  '/index.html',
  '/oci_foundations_quiz.html',
  '/gcp_cloud_digital_leader_quiz.html',
  '/az900_azure_fundamentals_quiz.html',
  '/aws_mlea_quiz.html',
  '/aws_data_engineering_quiz.html',
  '/aws_genai_quiz.html',
  '/terraform_associate_quiz.html',
  '/cissp_quiz.html',
  '/rhcsa9_quiz.html',
  '/rhce_quiz.html',
  '/css/quiz-common.css',
  '/quiz-engine.js',
  '/data/oci-questions.js',
  '/data/gcp-questions.js',
  '/data/az900-questions.js',
  '/data/aws-mlea-questions.js',
  '/data/aws-data-engineering-questions.js',
  '/data/aws-genai-questions.js',
  '/data/cissp-questions.js',
  '/data/rhcsa9-questions.js',
  '/data/rhce-questions.js',
  '/quiz-init-oci.js',
  '/quiz-init-gcp.js',
  '/quiz-init-az900.js',
  '/quiz-init-aws-mlea.js',
  '/quiz-init-aws-data-engineering.js',
  '/quiz-init-aws-genai.js',
  '/quiz-init-terraform.js',
  '/quiz-init-cissp.js',
  '/quiz-init-rhcsa9.js',
  '/quiz-init-rhce.js',
  '/quiz-config.js',
  '/quiz-nav.js',
  '/brain-dump.js',
  '/motivation.js',
  '/session-streak.js',
  '/sw-register.js',
  '/index-init.js'
];

function fullUrl(path) {
  return self.location.origin + path;
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_PATHS.map(fullUrl)).catch(function (err) {
        console.warn('SW precache failed for some URLs:', err);
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) { return name !== CACHE_NAME; }).map(function (name) {
          return caches.delete(name);
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, clone);
        });
        return response;
      }).catch(function () {
        return caches.match('/index.html').then(function (fallback) {
          return fallback || new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      });
    })
  );
});
