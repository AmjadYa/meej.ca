---
title: Autonomous Mario Kart Robot
description: Driving around a perilous terrain, no one to help...
slug: project-2
link: https://github.com/AmjadYa/Autonomous-Robot
---

<div class="flex gap-2">
    <video src="/videos/robot1.mp4" muted style="max-height:400px ; aspect-ratio:1; object-fit:cover" controls></video>
    <img src="/images/robot_on_zipline.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>



## Summary

In the summer of 2023, I had to build a robot that could navigate an obstacle course, collect coins off the ground, and complete laps for points - with no human interference. Since we thought things weren't hard enough, our team was **one of two** to implement a zipline mechanism to short-cut a part of the course.

We split the work up into three disciplines: Electrical, Hardware and Software and progressively integrated components together.

## Electrical

The biggest electrical challenge was getting the right power to all our motors. We had 5V motors, 3V pins, beefy 15V DC motors and an STM-32 Blue Pill (our robot's brain) all supplied from one 15V and one 9V lithium ion battery. We soldered a robust power distribution board with a combination of buck converters and voltage dividers. Due the high currents and magnetic fields caused by the DC motors we had to curl our external wires and take care to avoid noise. 

Another note is that the Blue Pill has incredibly sensitive pins (!!!). We used our oscilloscope countless times for troubleshooting pin-issues and power failures. I learned how delicate the electronics on low-power systems are.

<div class="flex gap-2">
    <img src="/images/h bridge.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
    <img src="/images/wired up.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>

## Hardware

We had a drive base that relied on Ackerman steering, with a servo steering the front wheels and DC motors driving the backwheels. The chassis was made out of lasercut plywood, acrylic and 3d printed parts. The zipline mechanism was designed so that the roller wheels interlock into each other like a zipper. This meant the reaction force from contact with the beam would help the claw stay shut. Once the robot touched the ground, that reaction component would disappear and we could safely open the claw again.

<div class="flex gap-2">
    <img src="/images/robotcad1.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
    <img src="/images/robotcad2.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>

## Software / Firmware

This project was where I fell in love with firmware; it's fun turning abstract instructions into actions.

We did everything in Arduino. My favourite functionality was a convolution algorithm that processed input from a 1kHz infrared beacon at the end of the track. This allowed us to detect the light we wanted to follow amidst potential noise and other IR sources. The algo would sample and normalize IR data (from IR sensors attached at the front), then convolve it with a predefined 1kHz wave and threshold the resulting sum to decide if the beacon was detected.

The whole robot operated through a multi-stage loop: initially following IR signals then 90 degree turns, PID steering up a ramp, ziplining down and restarting. Additionally, we used hardware interrupts to detect edges and executed maneuvers like backing up or making sharp turns before falling off the edge.

Putting the code together and getting to see the fruits of all the hardware-labour was satisfying.