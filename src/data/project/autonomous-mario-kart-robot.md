---
title: Autonomous Mario Kart Robot
description: Driving around a perilous terrain, no one to help...
slug: autonomous-mario-kart-robot
order: 3
link: https://github.com/AmjadYa/Autonomous-Robot
---

<div class="flex gap-2 flex-wrap sm:flex-nowrap">
    <video src="/videos/robot1.mp4" muted style="max-height:400px ; aspect-ratio:1; object-fit:cover" controls></video>
    <img src="/images/robot_on_zipline.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>

## Summary

In the summer of 2023, I had to build a robot that could navigate an obstacle course, collect coins off the ground and complete laps for points - with no human interference. Since we thought things weren't hard enough, our team was **one of two** to implement a zipline mechanism to short-cut a part of the course.

We split the work up into three disciplines: Electrical, Hardware and Software and progressively integrated components together.

## Electrical

The biggest electrical challenge was getting the right power to all our motors. We had 5V motors, 3V pins, beefy 15V DC motors and an STM-32 Blue Pill (our robot's brain) all supplied from one 15V and one 9V lithium ion battery. We soldered a robust power distribution board with a combination of buck converters and voltage dividers. Due the high currents and magnetic fields caused by the DC motors we had to curl our external wires and take care to avoid noise.

Another note is that the Blue Pill has incredibly sensitive pins (!!!). We used our oscilloscope countless times for troubleshooting pin-issues and power failures. I learned how delicate the electronics on low-power systems are.

<div class="flex flex-wrap sm:flex-nowrap gap-2">
    <img src="/images/h bridge.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
    <img src="/images/wired up.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>

## Hardware

Our drive base utilized Ackerman steering, with a servo directing the front wheels and DC motors powering the rear wheels. The chassis was made out of lasercut plywood, acrylic and 3d printed parts. The zipline mechanism was designed so that the roller wheels interlock into each other like a zipper. This meant the reaction force from contact with the beam would help the claw stay shut. Once the robot touched the ground, that reaction component would disappear and we could safely open the claw again.

<div class="flex flex-wrap sm:flex-nowrap gap-2">
    <img src="/images/robotcad1.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
    <img src="/images/robotcad2.jpg" style="max-height:400px ; aspect-ratio:1 ; object-fit:cover">
</div>

## Software / Firmware

This project was where I fell in love with firmware; it's fun turning abstract instructions into actions.

We implemented everything using Arduino. My favorite feature was a convolution algorithm that processed input from a 1kHz infrared beacon located at the end of the track. This enabled us to detect the desired light signal amidst potential noise and other IR sources. We sampled and normalized the IR data from front-mounted sensors, convolved it with a predefined 1kHz wave and applied a threshold to the resulting sum to determine whether the beacon was detected.

The whole robot operated through a multi-stage loop: initially following IR signals then 90 degree turns, PID steering up a ramp, ziplining down and restarting. Additionally, we used hardware interrupts to detect edges and execute maneuvers like backing up or making sharp turns before falling off the edge.

Putting the code together and getting to see the fruits of all the hardware-labour was satisfying.
