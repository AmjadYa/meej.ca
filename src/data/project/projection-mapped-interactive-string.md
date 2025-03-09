---
title: Projection-Mapped Interactive String
description: Using OpenCV and a projector to play nice chords.
slug: projection-mapped-interactive-string
order: 1
link: https://github.com/AmjadYa/interactive-string
---

## Demo Video

<div class="flex gap-2" style="justify-content: center ; align-items: center">
    <video src="/videos/pluck with glove.mp4" place-content-center muted style="max-height:400px ; object-fit:cover" controls></video>
</div>

_Make sure you unmute the video if you want to hear what it sounds like :)_

## The Vision

Ever since I learned about projection mapping, I have been wanting to try it for myself. I'm particularly inspired by this creator named <a href="https://www.instagram.com/roelofknol/?hl=en" target="_blank">Roelof Knol</a>, who's projections are always interactive. In this project, I wanted to project a guitar string on my wall and touch its image to play nice chords.

<div class="flex gap-2" style="justify-content: center ; align-items: center">
    <img src="/images/the string.png" style="max-height:400px ; object-fit:cover">
</div>

I chose muted off-white colours to make it look mysterious...

## Current Progress

It works nicely with a glove! I have to play around with thresholding and lighting a little more to get it to work with just my finger. Check out the video at the top of this document to see what it looks like currently.

### The String

I used Processing to create a virtual string. If a contour gets close to the string it plays a chord and vibrates. Cute little particles emenate from the string each time it's plucked too.

Chords are randomly picked from a bank I created, however, susequent chords are picked using strategies inspired by common practices in music theory. After the string is plucked, one of seven strategies is picked. The chord pool is then re-analyzed for chords that fit the criteria defined by the selected strategy. Occasionally when plucked, the string ignores the strategy and picks a random chord (so we don't get stuck in loops).

Check out "pluck5.pde" from the <a href="https://github.com/AmjadYa/interactive-string" target="_blank">GitHub repository</a>.

### Detecting When It's Plucked

I convert my camera feed into binary (black and white) and detect the largest black spaces. (In reality I invert the image and detect the largest white contours.) When a thin shadow (your finger) passes over the string it _plucks_ the string starting at the x-value of the contour.

Check out "center_contours.pde" from the <a href="https://github.com/AmjadYa/interactive-string" target="_blank">GitHub repository</a>.