---
title: Breaking Blood Clots in Zero G
description: Studying clot behaviour for future space mission safety. 
slug: project-4
link: https://github.com/AmjadYa/
---

<img class="mx-auto" src="/images/UBCRocket_TeamPhoto.JPG" style="max-height:400px ; object-fit:cover">

## What happened to you?!

They told me it would be the hardest semester of my life. (They were right.)

In the summer of 2023, I had to build a robot that could navigate an obstacle course, collect coins off the ground and complete laps for points with no human interference. Since we thought things weren't hard enough, our team was **one of two** to use the zipline to short-cut a part of the course.

We split the work up into three disciplines: Electrical, Hardware and Software and progressively integrated components together.

## Electrical

<div class="flex gap-2">
    <img src="/images/h bridge.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
    <img src="/images/wired up.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>

## Hardware

We had a drive base that relied on Ackerman steering, with a servo steering front wheels and DC motors driving backwheels. The chassis was made out of lasercut plywood and acrylic and 3d printed parts. The zipline mechanism was designed so that the roller wheels interlock into each other like a zipper. This meant the reaction force from contact with the beam would help the claw stay shut. Once the robot touched the ground, that reaction component would disappear and we could safely open the claw again.

<div class="flex gap-2">
    <img src="/images/robotcad1.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
    <img src="/images/robotcad2.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>

## Software / Firmware

This project was where I fell in love with firmware; it's fun turning abstract instructions into actions.

We did everything in Arduino. My favourite functionality was a convolution algorithm that processed input from a 1kHz infrared beacon at the end of the track. This allowed us to detect the light we wanted to follow amidst potential noise and other IR sources. The algo would sample and normalize IR data (from IR sensors attached at the front), then convolve it with a predefined 1kHz and threshold the resulting sum to decide if the beacon was detected.

The whole robot operated through a multi-stage loop: initially following IR signals then hard-coded 90 degree turns, PID steering up a ramp, ziplining down and restarting. Additionally, we used hardware interrupts to detect edges and executed maneuvers like backing up or making sharp turns before falling off the edge.

Putting the code together and getting to see the fruits of all the hardware-labour was satisfying.

<small>Also... I wasn't very good at OOP yet so all the code was in one file. I'm better now I promise.</small>
