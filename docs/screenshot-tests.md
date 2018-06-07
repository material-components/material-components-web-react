# Screenshot Testing

Screenshot testing is an important ingredient in building and maintaining the MDC React Library. This is a how-to guide on our home grown solution to screenshot testing. We use [resemblejs](https://www.npmjs.com/package/resemblejs) to perform image diffs, and [puppeteer](https://github.com/GoogleChrome/puppeteer) to collect the screenshots.

## Tech Stack

- [resemblejs](https://www.npmjs.com/package/resemblejs)
- [mocha](https://github.com/mochajs/mocha)
- [puppeteer](https://github.com/GoogleChrome/puppeteer)

## Running Tests Locally

> If this is your first time using Docker, you may find it helpful to sift through the [Getting Started Guide](https://docs.docker.com/get-started/#images-and-containers). This [3rd Party Guide](http://odewahn.github.io/docker-jumpstart/building-images-with-dockerfiles.html) is also a helpful quick reference for some terms.

You should have docker already installed on your machine. Please follow [instructions](https://docs.docker.com/install/) to install.

#### STEP 1: Build pull the Docker Image

If you already pulled this image before you can skip this step. If there has been a change to the `Dockerfile`, please follow [these steps](#building-new-docker-image).

```
docker pull mdcreact/screenshots
```


#### STEP 2: Run a Docker Container

Ensure that you have a `MDC_GCLOUD_SERVICE_ACCOUNT_KEY` environment variable (ie. ~/.bashrc, ~/.bash_profile). Otherwise you will need to paste it inline in the command below. You can get this off of the Google Cloud Platform Admin Tool (3rd party contributors will not be able to download/upload screenshots until this is part of the process is changed).

```
docker run -it --rm --cap-add=SYS_ADMIN -e MDC_GCLOUD_SERVICE_ACCOUNT_KEY="${MDC_GCLOUD_SERVICE_ACCOUNT_KEY}" mdcreact/screenshots /bin/sh
```

This command opens a container based from the `mdcreact/screenshots` image you created in Step 1.

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
git checkout <INSERT_YOUR_BRANCH_NAME>
npm install
./test/screenshot/start.sh
```

Wait for about 2 - 3 minutes for the server to start up (we know the long wait is an issue). The `start.sh` script is a proxy to `npm start`, but doesn't output to the terminal so you can run other commands.

```
npm run test:image-diff
```

This will kick off the screenshot tests. You will see the regular terminal output from mocha.

## Troubleshooting

### Building New Docker Image

You may need to update the Docker image. Follow these steps:

From the project's root directory run the following command:

```
docker build -t screenshots .
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
