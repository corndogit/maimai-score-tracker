# Maimai Score Tracker

A score tracker for manually recording scores from offline maimai FiNALE.
Uses React + Vite. Work-in-progress.

## Developer Setup

Just clone the repo, run `npm install` and `npm run dev` to start the dev server.
Recommended Node version: v22.14.0 LTS or higher

## To-do

### Phase 1

User story: _As a MaiMai FiNALE player, I want to add all my scores from a session to a single JSON payload that can be batch imported into [Kamaitachi](https://kamai.tachi.ac)_

- [x] Finish building UI skeleton
- [x] Create seed data and mechanism to load in-memory
- [x] Create data types for songs & scores
- [ ] Add logic to add a song to submit
  - [x] Stretch: calculate rating
- [x] Add logic to view scores in a table
- [ ] View the currently pending scores
- [ ] Create a JSON payload of scores
- [ ] Import scores from a file
- [ ] Containerize
- [ ] Homepage, Help & About
  - [ ] Stretch: add unit tests

### Phase 2 AKA create the rest of the fucking backend

User story: _As a MaiMai FiNALE player, I want somewhere to persist and view all of my scores and score history_

- [ ] Create data types for user and settings
- [ ] Finish implementing a basic REST API for sending and receiving user, chart and score data
- [ ] Add persistence to the back-end
- [ ] Allow user to register and log-in
  - [ ] Stretch: Allow users to add their Tachi API key to do an import
- [ ] Allow submission and retrieval of the user's scores to/from the back-end
- [ ] Allow bulk export of the user's scores from the tracker
  - [ ] Stretch: add E2E-style integration tests (cypress? lol)

### Phase 3 nice to haves

TBC

## Licensing

TBC
