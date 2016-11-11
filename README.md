# PNG-COMPARE

[![Build Status](https://travis-ci.org/maxcbc/png-compare.svg?branch=master)](https://travis-ci.org/maxcbc/png-compare)

## Description

This module uses imagemagick's compare command to compare two identically sized png images.

## (baseline, comparator, options*) ⇒ `variance`

**Kind**: function

### Parameters

| Param      | Type     | Description                                                              |
| ---------- | -------- | ------------------------------------------------------------------------ |
| baseline   | `String` | the location of the baseline png you want to compare against             |
| comparator | `String` | the location of the comparator png you want to compare to the baseline   |

### Returns
| Name      | Type      | Description                                                                                      |
| ---------- | -------- | ------------------------------------------------------------------------------------------------ |
| variance   | `Number` | the percentage of pixels that are different on the comparator png when compared to the baseline  |




## Installation

`npm install png-compare`

<!--To add this to your module run:-->
<!--`npm i png-compare`-->

### Pre-requisites

#### Node
This module is tested on Node versions 4.x, 5.x, 6.x and 7.x via Travis-CI. The status of these tests can be seen on the module's [travis page](https://travis-ci.org/maxcbc/png-compare).


#### Imagemagick

##### MacOS
- `brew install imagemagick`

##### Ubuntu 
- `sudo apt-get install imagemagick`