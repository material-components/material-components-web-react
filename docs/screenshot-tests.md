# Screenshot Testing

Unit tests are great for JavaScript, but how do you test CSS? With screenshots! We use a [headless](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md) instance of Chrome controlled through [Puppeteer](https://github.com/GoogleChrome/puppeteer) to generate screenshots of our test pages. Those generated screenshots are compared through [Resemble.js](https://github.com/HuddleEng/Resemble.js) for [pixel-perfect](#about-pixel-perfect-comparison) accuracy. The golden screenshots (ones deemed to be correct) are then checked into the repository, ensuring we have a reference for how a component should look.

## Tech Stack

- [resemblejs](https://www.npmjs.com/package/resemblejs)
- [mocha](https://github.com/mochajs/mocha)
- [puppeteer](https://github.com/GoogleChrome/puppeteer)

## Running Tests Locally

> If this is your first time using Docker, you may find it helpful to sift through the [Getting Started Guide](https://docs.docker.com/get-started/#images-and-containers). This [3rd Party Guide](http://odewahn.github.io/docker-jumpstart/building-images-with-dockerfiles.html) is also a helpful quick reference for some terms.

You should have docker already installed on your machine. Please follow [instructions](https://docs.docker.com/install/) to install.

### STEP 1: Build pull the Docker Image

If you already pulled this image before you can skip this step. If there has been a change to the `Dockerfile`, please follow [these steps](#building-new-docker-image).

```
docker pull mdcreact/screenshots
```

### STEP 2: Run a Docker Container

Ensure that you have a `MDC_GCLOUD_SERVICE_ACCOUNT_KEY` environment variable (ie. ~/.bashrc, ~/.bash_profile). Otherwise you will need to paste it inline in the command below. You can get this off of the Google Cloud Platform Admin Tool (3rd party contributors will not be able to download/upload screenshots until this is part of the process is changed).

```
docker run -it --rm --cap-add=SYS_ADMIN -e MDC_GCLOUD_SERVICE_ACCOUNT_KEY="${MDC_GCLOUD_SERVICE_ACCOUNT_KEY}" mdcreact/screenshots /bin/bash
```

This command opens a container based from the `mdcreact/screenshots` image you created in Step 1.

#### Breaking it down

Option | Description
--- | ---
`-it` | Allow CLI interaction with the container
`--rm` | When the container is closed, remove it from memory
`--cap-add=SYS_ADMIN` | Run container with system admin privileges
`-e MDC_...="${MDC_...}"` | Set MDC_GCLOUD_SERVICE_ACCOUNT_KEY env variable

### STEP 3: Run Tests

This Docker container is mainly designed for running the screenshot tests. The container already has 1) cloned the repo and 2) `npm install` the project dependencies.

In the Docker container, start the server:

```
git pull
git checkout --track origin/<BRANCH_NAME>
npm install
./test/screenshot/start.sh
```

Wait for about 2 - 3 minutes for the server to start up (we know the long wait is an issue). The `start.sh` script is a proxy to `npm start`, but doesn't output to the terminal so you can run other commands.

After waiting 2 - 3 minutes, run the screenshot tests:

```
npm run test:image-diff
```

You will see the regular terminal output from mocha. Most importantly, it will output two partial URLs for every screenshot test, which you will use to compare screenshots in STEP 4:

```
<path>/<to>/<file>.html/<commit-hash>/<screenshot-test-id>.diff.png
<path>/<to>/<file>.html/<commit-hash>/<screenshot-test-id>.snapshot.png
```

### STEP 4: Debug Screenshot Changes

A `*.snapshot.png` and a `*.diff.png` file will be generated for each screenshot test and uploaded to a Google Cloud Storage bucket. They're publicly accessible through the following URL scheme:

```
https://storage.googleapis.com/screenshot-uploads/<path>/<to>/<file>.html/<commit-hash>/<screenshot-test-id>.diff.png
https://storage.googleapis.com/screenshot-uploads/<path>/<to>/<file>.html/<commit-hash>/<screenshot-test-id>.snapshot.png
```

where `<commit-hash>` is the [short eight character hash of the commit](https://stackoverflow.com/a/5694416) and `/<path>/<to>/<file>` is the path to the HTML file you wish to view, relative to the `/test/screenshot` folder. You can copy/paste the terminal output from STEP 3 to quickly go to the URL. Compare screenshots and make sure everything looks as expected.

> _NOTE_: Neither the `*.snapshot.png` nor `*.diff.png` get checked in to the repo. This helps to keep the repo clean and makes it serve as the single source of truth for how components should look. To keep Google Cloud Storage costs low, screenshots will need to be cleaned up periodically, perhaps through a cron job.

### STEP 5: Commit Screenshot Goldens

If you modified any of the screenshot test files, run this command inside the Docker container to update `test/screenshot/golden.json`:

```
npm run capture
```

Then commit and push this change to your PR!

> _NOTE_: If you have two-factor authentication turned on for your GitHub account, you'll need to use a [Personal Access Token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) to push.

## Troubleshooting

### Building New Docker Image

You may need to update the Docker image. Follow these steps:

From the project's root directory run the following command:

```
docker build --no-cache -t screenshots .
```

This command builds a Docker image named `screenshots` based off the `Dockerfile` found in the root directory. Next push this to the Docker Hub for Travis tests. If you are testing you may want to use a different [tag](https://hub.docker.com/r/mdcreact/screenshots/tags/) in the interim.

```
docker images
```

This will output a list of your local images. You will want to grab the most recent `IMAGE_ID` with the `REPOSITORY` name `screenshots` (the name you used in the `docker build` step). Next create the tag:

```
docker tag <IMAGE_ID> mdcreact/screenshots:<YOUR_TAG_NAME> # defaults to :latest
```

This will create the tag, which you can then push to Docker Hub:

```
docker push mdcreact/screenshots:<YOUR_TAG_NAME>
```

Now you're ready to share the image with the world!

## About pixel perfect comparison

Our screenshot comparison ignores anti-aliasing differences between the golden screenshots and your snapshots. This is to ensure that OS-level differences between how subpixels are rendered don't cause test failures. It also ensures that we can have a single source of truth for the goldens instead of one golden per OS. You can read more about subpixel rendering [here](https://en.wikipedia.org/wiki/Subpixel_rendering).
