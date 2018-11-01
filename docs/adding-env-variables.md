# Adding Environment Variables

Environment variables are a great way to molding your developer environment your own. You can create alias's or variables that you can refer to in your command line. In our case, it's useful for configuring `create-react-app` to work with our Sass modules. To permanently set your `SASS_PATH` environment follow the instructions below:

## Windows

#### Using SETX

Windows is straightforward and requires just one command.

Open command line terminal, and enter the following:

```bat
SETX SASS_PATH .\node_modules
```

> _NOTE:_ Be sure to close that terminal and open a new one for the new settings to take effect.

## Mac OS X

#### Open your `bash_profile`
You can add an environment variable to your system by updating your `~/.bash_profile`. Open a terminal window and follow these steps:

```sh
vi ~/.bash_profile # you can use your favorite text editor here (nano, vim, etc.)
```

If you already have one that exists, it might have properties that look like text below. If it does, you're probably in the right place.

```sh
source ~/.nvm/nvm.sh

export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad

alias ls='ls -GFh'
```

#### Add the new environment variable

To add a new environment variable add the following line:

```sh
source ~/.nvm/nvm.sh

export CLICOLOR=1
export LSCOLORS=ExFxBxDxCxegedabagacad

alias ls='ls -GFh'

export SASS_PATH=./node_modules # !add this line!
```

Save and exit from the file.

#### Source your updated `bash_profile`

Open new terminal window for these settings to take effect.

If you want to keep the same terminal, source your `bash_profile` with the following:

```sh
source ~/.bash_profile
```

## Linux

Linux is pretty similar to Mac OS X if you're familiar with that operating system. The steps are identical, with the exception that your environment configuration lives in the `~/.bashrc` file.



You can add an environment variable to your system by updating your `~/.bash_profile` (on OS X) or `~/.bashrc` (on Linux). If you're on Windows please read
