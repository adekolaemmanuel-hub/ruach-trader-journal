# Developer Guide - RUACH Trader Journal

Follow these steps to run locally and test end-to-end.

## Prereqs
- Git
- Node 20, npm
- Docker & docker-compose
- Flutter SDK
- Java JDK 11+
- Android emulator or device
- (Optional) AWS account for S3 or LocalStack for local S3 emulation
- Google Play service account JSON for subscription verification

## Local backend
1. cd services/api
2. cp .env.example .env (edit values)
3. npm ci
4. npx prisma generate
5. docker-compose up -d
6. npx prisma migrate dev --name init
7. npm run dev

## Local mobile
1. cd apps/mobile
2. flutter pub get
3. echo "API_BASE_URL=http://10.0.2.2:4000" > .env
4. flutter run

## Deploy to Render (backend)
- Push repo to GitHub
- Create Postgres managed DB
- Create Web Service in Render pointing to services/api
- Set env vars in Render (DATABASE_URL, GOOGLE_PLAY_SERVICE_ACCOUNT_JSON (base64), S3 keys)

## Play Console
- Create subscription product `ruach_monthly` priced at ₦1,000/month
- Add internal testers, use Internal Testing track for purchases

## Notes
- The bundled Flutter paywall UI is custom-styled; it calls Play Billing via in_app_purchase plugin.
- Validate purchases on server using the Play Developer API and the service account JSON.
