# Codr

Codr is a Node.js command line tool that extends my previous [cfhelper](https://github.com/callistusystan/codeforcesHelper).

It accepts a URL to a coding problem (on a listed platform), and sets up a folder for the problem with all the test cases. As a bonus, a template program and test script is generated! This saves a lot of setup time, so one can just focus on solving the problem! :smile:

Codr currently works for the following:
1. [Codeforces](http://www.codeforces.com)
2. [HackerRank](https://www.hackerrank.com) (Work in progress)

NOTE: To use the default test script, the C++ executable should be named "sol" (g++ -std=c++14 <code.cpp> -o sol)

Codr is free to use! If you like it, please support me and give it a star on my Github, www.github.com/callistusystan/codr :star:

If there are any problems with the tool, feel free to raise an issue on the Github repo, www.github.com/callistusystan/codr/issues or send me an email at callistusystan@gmail.com

## Background ##

Codr is the design I should have made when implementing cfhelper. It makes use of an extensible Parser superclass, which passes the responsibility of parsing to the concrete subclasses.

The arguments to pass in the command line is also simplified.

Thank you to all users for choosing to use Codr!

## Installation ##

Requirements:

1. Node.js with NPM

Steps:

1. Open a terminal (with Node.js installed)
2. Enter the following command:

	```
		> npm install -g codr
	```

## Usage ##

```
usage: codr [-h | --help]
            [<directory> <URL>]
            [-t | --template <templateFilePath>]
            [-r | --runscript <runScriptPath>]

actions:
  -h, --help          shows this help message and exit.

  <directory> <URL>   extracts the input, outputs of problem(s) in the URL
                      and sets up a new folder for the problem(s) in the
                      specified directory.
                      can also create a program folder by omitting URL.

                      example: codr . http://codeforces.com/problemset/problem/1/A
                      example: codr . https://www.hackerrank.com/contests/projecteuler/challenges/euler001
                      example: codr .

                      NOTE: URL must be a publicly accessible link to a problem.

  -t, --template      sets the specified template file that will be generated when extracting problem data
                      the template file may be reset to default by specifying "default".

                      example: codr -t ./template.py
                      example: codr -t default

                      NOTE: templateFile must be a valid path to an existing file.
                      NOTE: may require "sudo su".

  -r, --runscript     sets the specified runscript that will be generated when extracting problem data.
                      the runscript may be reset to default by specifying "default".
                      the runscript can be disabled by specifying "off".

                      example: codr -r ./test.sh
                      example: codr -r default
                      example: codr -r off

                      NOTE: templateFile must be a valid path to an existing file.
                      NOTE: may require "sudo su".
```

## Useful Documentation ##

1. Install Bash on Ubuntu on Windows

	https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/

2. Install Node.js with NPM on Bash on Ubuntu on Windows

	https://aigeec.com/installing-node-js-on-windows-10-bash/
