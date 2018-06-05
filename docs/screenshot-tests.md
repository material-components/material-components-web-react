# Screenshot Testing

Screenshot testing is an important ingredient in building and maintaining the MDC React Library. This is a how-to guide on our home grown solution to screenshot testing. We use [resemblejs](https://www.npmjs.com/package/resemblejs) to perform image diffs, and [puppeteer](https://github.com/GoogleChrome/puppeteer) to collect the screenshots.

## Tech Stack

- [resemblejs](https://www.npmjs.com/package/resemblejs)
- [mocha](https://github.com/mochajs/mocha)
- [puppeteer](https://github.com/GoogleChrome/puppeteer)

## Running Tests Locally

> If this is your first time using Docker, you may find it helpful to sift through the [Getting Started Guide](https://docs.docker.com/get-started/#images-and-containers). This [3rd Party Guide][http://odewahn.github.io/docker-jumpstart/building-images-with-dockerfiles.html] is also a helpful quick reference for some terms.

You should have docker already installed on your machine. Please follow [instructions](https://docs.docker.com/install/) to install.

#### STEP 1: Build the Docker Image

From the project's root directory run the following command:

```
docker build -t screenshots .
```

This command builds a Docker image named `screenshots` based off the `Dockerfile` found in the root directory.

#### STEP 2: Run a Docker Container

Ensure that you have a `MDC_GCLOUD_SERVICE_ACCOUNT_KEY` environment variable (ie. ~/.bashrc, ~/.bash_profile). Otherwise you will need to paste it inline in the command below. You can get this off of the Google Cloud Platform Admin Tool (3rd party contributors will not be able to download/upload screenshots until this is part of the process is changed).

```
docker run -it --rm --cap-add=SYS_ADMIN -e MDC_GCLOUD_SERVICE_ACCOUNT_KEY="${MDC_GCLOUD_SERVICE_ACCOUNT_KEY}" screenshots /bin/sh
```

This command opens a container based from the `screenshots` image you created in Step 1.

##### Breaking it down

Option | Description
--- | ---
`-it` | Allow CLI interaction with the container
`--rm` | When the container is closed, remove it from memory
`--cap-add=SYS_ADMIN` | Run container with system admin privileges
`-e MDC_...="${MDC_...}"` | Set MDC_GCLOUD_SERVICE_ACCOUNT_KEY env variable

#### STEP 3: Run Tests

At this point you are ready to run. This Docker container is mainly designed for running the screenshot tests. The container already has 1) cloned the repo and 2) `npm install` the project dependencies.

The next thing you need to do is start the server and run the tests.

```
./test/screenshot/start.sh
```

Wait for about 2 - 3 minutes for the server to start up (we know the long wait is an issue). The `start.sh` script is a proxy to `npm start`, but doesn't output to the terminal so you can run other commands.

```
git checkout <INSERT_YOUR_BRANCH_NAME>
npm run test:image-diff
```

This will kick off the screenshot tests. You will see the regular terminal output from mocha. 
