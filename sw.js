/**
 * Cloud Cram – simple offline-first service worker.
 * Precaches all pages and scripts; serves from cache when available (offline or on).
 */
'use strict';

const CACHE_NAME = 'cloudcram-v15';

const PRECACHE_PATHS = [
  '/index.html',
  '/oci_foundations_quiz.html',
  '/gcp_cloud_digital_leader_quiz.html',
  '/gcp_professional_cloud_architect_quiz.html',
  '/gcp_associate_cloud_engineer_quiz.html',
  '/az900_azure_fundamentals_quiz.html',
  '/az104_azure_administrator_quiz.html',
  '/az305_azure_solutions_architect_quiz.html',
  '/aws_mlea_quiz.html',
  '/aws_data_engineering_quiz.html',
  '/aws_genai_quiz.html',
  '/terraform_associate_quiz.html',
  '/cissp_quiz.html',
  '/secai_quiz.html',
  '/rhcsa9_quiz.html',
  '/rhce_quiz.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-512-maskable.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png',
  '/favicon.ico',
  '/css/quiz-common.css',
  '/quiz-engine.js',
  '/data/oci-questions.js',
  '/data/gcp-questions.js',
  '/data/gcp-pca-questions.js',
  '/data/gcp-pca-case-studies.js',
  '/data/gcp-pca-scenario-questions.js',
  '/data/gcp-ace-questions.js',
  '/data/az900-questions.js',
  '/data/az104-questions.js',
  '/data/az104-extra-questions.js',
  '/data/az104-boost-questions.js',
  '/data/az104-case-studies.js',
  '/data/az104-scenario-questions.js',
  '/data/az305-questions.js',
  '/data/az305-extra-questions.js',
  '/data/az305-boost-questions.js',
  '/data/az305-case-studies.js',
  '/data/az305-scenario-questions.js',
  '/data/gcp-ace-extra-questions.js',
  '/data/aws-mlea-extra-questions.js',
  '/data/aws-dea-extra-questions.js',
  '/data/aws-genai-extra-questions.js',
  '/data/aws-mlea-questions.js',
  '/data/aws-data-engineering-questions.js',
  '/data/aws-genai-questions.js',
  '/data/cissp-questions.js',
  '/data/cissp-case-studies.js',
  '/data/cissp-scenario-questions.js',
  '/data/aws-mlea-case-studies.js',
  '/data/aws-mlea-scenario-questions.js',
  '/data/aws-dea-case-studies.js',
  '/data/aws-dea-scenario-questions.js',
  '/data/aws-genai-case-studies.js',
  '/data/aws-genai-scenario-questions.js',
  '/data/secai-case-studies.js',
  '/data/secai-scenario-questions.js',
  '/data/secai-questions.js',
  '/data/rhcsa9-questions.js',
  '/data/rhcsa9-extra-questions.js',
  '/data/rhce-questions.js',
  '/quiz-init-oci.js',
  '/quiz-init-gcp.js',
  '/quiz-init-gcp-pca.js',
  '/quiz-init-gcp-ace.js',
  '/quiz-init-az900.js',
  '/quiz-init-az104.js',
  '/quiz-init-az305.js',
  '/quiz-init-aws-mlea.js',
  '/quiz-init-aws-data-engineering.js',
  '/quiz-init-aws-genai.js',
  '/quiz-init-terraform.js',
  '/quiz-init-cissp.js',
  '/quiz-init-secai.js',
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
