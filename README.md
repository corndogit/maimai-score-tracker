# Maimai Score Tracker

A web-based score tracker for manually recording scores from maimai FiNALE.

## Description

Maimai Score Tracker is a single-page web application for manually keeping track of maimai FiNALE scores at locations where online play is not supported. Users can submit scores for each play, which includes chart information and score details, which is stored in local browser storage. Scores can then be viewed or exported in JSON to use with other score tracking services. A batch import can also be used to add scores in bulk to Maimai Score Tracker.

### Features

- Submit scores for any chart (Basic to Re:Master) from maimai FiNALE
- View scores in a table and filter by name
- Export scores as JSON and upload scores directly to Kamaitachi
- Bulk import scores from JSON

## Developer Setup

Maimai Score Tracker uses React 19 and Vite and requires the following:

- Node v22.14.0 LTS or higher
- Docker

WSL is also recommended on Windows machines but not a strict requirement

### Local deployment

Clone the repo, run `npm install` and `npm run dev` to start the dev server. Recommended for developing new changes.

To test against a production build, either run `npm run build` and `npm run preview`, or use the [Docker build & deployment script](#docker-deployment)

### Docker deployment

A script named `docker-build.sh` is provided to build and run the application in production mode. To start it, run `./docker-build.sh run`

## To-do

### Phase 1

Core functionality of the application

User story: _As a MaiMai FiNALE player, I want to add all my scores from a session to a single JSON payload that can be batch imported into [Kamaitachi](https://kamai.tachi.ac)_

<details>
<summary>Tasks (click to expand)</summary>

- [x] Finish building UI skeleton
- [x] Create seed data and mechanism to load in-memory
- [x] Create data types for songs & scores
- [x] Add logic to add a song
  - [x] Stretch: calculate rating
- [x] Add logic to view scores in a table
- [x] View the current scores
  - [x] Stretch: search and filter in view scores page
- [x] Create a JSON payload of scores
- [x] Import scores from a file
  - [x] Stretch: score validation on imported scores
  - [x] ~~Stretch: De-duplicate scores~~ Won't do
- [x] Homepage
- [x] Help & About
- [x] Containerize
- [x] Deploy and make public

</details>

### Phase 2

Persistence in local storage, improvements and nice to haves

User story: _As a MaiMai FiNALE player, I want somewhere to persist and view all of my scores and score history_

<details>
<summary>Tasks (click to expand)</summary>

- [x] Create data types for user and settings
- [x] Persist scores and settings in local storage
- [x] Allow bulk export of the user's scores from the tracker
- [x] Allow users to add their Tachi API key to do an export to Kamaitachi
- [x] Allow users to view individual scores
- [ ] Calculate and display MaiMai DX rating on individual scores

</details>

### Future work

Implement a back-end to allow account creation and syncing of scores to the server. Still thinking about this, kind of like having it as an all-in-one tool as it stands,
requires a big chunk of work and unsure if users would find it useful.

User story: _As a MaiMai Score Tracker user, I want to back-up my scores and sync them across devices_

<details>
<summary>Tasks (click to expand)</summary>

- [ ] Finish designing a basic REST API for sending and receiving user/score data
- [ ] Allow user to register and log-in
- [ ] Allow syncing of the user's scores to/from the back-end
- [ ] Add persistence to the back-end

</details>

## Licensing

Licensed under [MIT License](./LICENSE). This is an unofficial fan-made tool and not officially endorsed by Sega.
