---
title: CNN Letter Detecting ROS Sim
description: Teacher kept telling me that I'm just a neural network.
slug: cnn-letter-detecting-ros-sim
order: 2
link: https://github.com/AmjadYa/fizzcomp
---

<div class="flex gap-2" style="justify-content: center ; align-items: center">
    <video src="/videos/CNN competition.MOV" place-content-center muted style="max-height:400px ; object-fit:cover" controls></video>
</div>

<h2>Introduction</h2>

<h3>Background of the Report</h3>
<p>
This project was the culmination of <strong>eight</strong> labs that provided the essential background to develop a fully autonomous, line-following robot for the semester's end competition. This report details the development and implementation of a control system and Convolutional Neural Network (CNN) enabling the robot to detect and read clue plates, navigate a predefined track and avoid obstacles. The labs were very useful! For a personal logbook of all labs and related thoughts, you can click <a href="/pdfs/Amjad%20Yaghi%20individual%20logbook.pdf" target="_blank">here</a>.
</p>

<h3>Contribution Split</h3>
<p>
Richard Helper: PID-based line following and obstacle avoidance.<br>
Amjad Yaghi: CNN-based clue detection, visual processing of clue boards, UI development, emergency teleportation strategy for competition.
</p>

<h3>Software Architecture</h3>
<p>
<img src="/images/controller.drawio.png" alt="Driving software architecture" style="max-width:80%; display:block; margin:auto;" />
</p>
<p style="text-align:center;">
<a href="https://github.com/OdysseusInSpace/ENPH353_LineFollow" target="_blank">Driving software architecture</a>
</p>

<p>
<img src="/images/gui3.drawio.png" alt="Software architecture used on competition day" style="max-width:80%; display:block; margin:auto;" />
</p>
<p style="text-align:center;">
<a href="https://github.com/AmjadYa/fizzcomp/tree/main" target="_blank">Software architecture used on competition day</a>
</p>

<hr />

<h2>Discussion</h2>

<h3>Robot Driving Method</h3>
<p>
The planned driving module used PID, a state machine, and several specific behaviours to make its way through the obstacle course. Unfortunately, we were not able to integrate it with the clue detection in time, and so were forced to go through with our emergency controller detailed at the end of the section.
</p>

<h4>Contour Detection and Basic PID</h4>
<p>
Due to the roundabout in the middle of the on-road section, the robot needed to be biased toward turning left so as not to collide head on with the truck. There was also the issue of noise in the middle of the road during the dirt phase. To counteract these issues, the PID was based off the centre of the leftmost contour above a certain perimeter threshold, using an adaptive offset towards the opposite end of the screen that grew smaller as the marker was placed closer to the horizon. See the figure below for an example.
</p>
<p>
<img src="/images/Dirt_Contour.png" alt="Contour detection and PID marker" style="max-width:50%; display:block; margin:auto;" />
</p>

<h4>Staging</h4>
<p>
As the robot drives, it encounters different scenarios marked by lines across the road. There is a red bar that marks the beginning of the pedestrian section and pink ones that mark the transition between the paved road, dirt road, offroad, and hill sections. The drive module uses a state machine to account for this. Whenever one of these lines is detected – that is, the bottom 10% of the screen has a certain number of pixels that satisfy the red-pink masking – and then disappears, the next state is initialized. This usually means swapping image processing and control algorithms, as is detailed later in this section.
</p>

<h4>NPC Avoidance</h4>
<p>
Of the three NPCs, the pedestrian was the only one that the robot would ever hit. The truck acted as a contour in such a way that the PID automatically avoided it, and Baby Yoda was navigated around entirely.<br/>
To dodge the pedestrian, the staging system was put to simple use. Upon crossing the red line, the robot swaps to phase 2, and waits for the marker to shift dramatically. As the pedestrian crosses the left side of the road, it would disrupt the contour and cause this shift. The robot would then resume its normal behaviour.
</p>
<p>
<img src="/images/Pedestrian-Readout.png" alt="Readout of pedestrian detection" style="max-width:50%; display:block; margin:auto;" />
</p>

<h4>Offroading</h4>
<p>
The offroad section consists of five simple phases. First, the robot drives forwards at an angle towards the hill for a set period of sim time. It’s not particularly sensitive as to where the robot ends up, so this worked fine. Then the robot would turn until it detected the windows of the car through the blue mask shown in the figure below. These windows are a very particular shade of blue, so it doesn’t get confused by the clue boards. It then PIDs directly toward the centroid of these pixels until they make up a certain percentage of the screen. Finally, it turns right until the pink line is centred in its view, thus catching a view of the clue, and drives towards the tunnel.
</p>
<p>
<img src="/images/Blue_Filter.png" alt="Filtering for car windows" style="max-width:40%; display:block; margin:auto;" />
</p>

<h4>Emergency Controller</h4>
<p>
The controller used in the competition does the following:<br>
Drive for a predetermined time in predetermined steps, wait for the CNN to report a board, and then continue its circuit. This circuit includes teleportation to each staging line. 
<a href="https://github.com/AmjadYa/fizzcomp/blob/main/src/controller/src/bismillah_sequence.py" target="_blank">Here is a link to the python file which contains this sequence.</a>
</p>

<h3>Clue Plate Recognition Module (CNN)</h3>

<h4>Data Acquisition</h4>
<p>
All data was acquired manually by going into the simulation after changing the clue boards. I would drive around and screenshot them using the GUI. Here’s a demo of what that looked like:
</p>
<p>
<img src="/images/usingui.png" alt="GUI showing homography for screenshots" style="max-width:85%; display:block; margin:auto;" />
</p>
<p>
<a href="https://github.com/AmjadYa/fizzcomp/tree/main/src/controller/saved_images" target="_blank">This was done tens of times</a> – and although time consuming – gave us very transferrable (as in: relevant to what we would see on competition day) training data. The GUI has drop-down menus that allow you to control what you want to see in the display labels. This was very useful for testing how much to threshold, erode, dilute, and process images in general.
</p>

<h4>Image Processing</h4>
<p>
Images were then meticulously broken down into contours and stretched to get clear pictures of each letter for the CNN to train on / predict. You can read the exact steps 
<a href="https://github.com/AmjadYa/fizzcomp/blob/main/src/controller/src/prediction_module.py" target="_blank">here, in the prediction module of the repository.</a> In short, images were cut in half and a contour box was forcefully drawn around the individual letters. If there was overlap, contours were limited to a certain size and would forcefully split into the best number of boxes in order to separate the letters. 
<a href="https://colab.research.google.com/drive/1P0j5OBePBGmmYEO2-LqW9yZ2Fc2BDcIC?usp=sharing" target="_blank">There is also a more digestible version on Google Colab</a> which you can play around with and test for yourself.
</p>

<h4>Model Architecture</h4>
<p>
The architecture we used for training was inspired by previous work we did in our labs in class, 
<a href="https://docs.google.com/document/d/1fihwZEmhyZtpW0ugc-sJJCCq7CGPNyqaXhZ294aimtY/edit?tab=t.0" target="_blank">which you can read more about here</a>. The following is an image of the model summary.
</p>
<p>
<img src="/images/modelarch.png" alt="Model architecture summary" style="max-width:70%; display:block; margin:auto;" />
</p>

<h4>Training on Images</h4>
<p>
Since we did not do any data augmentation (no artificially generated data based on what we had already), we needed as much of our dataset used for training as possible. As such, the strategy was to monitor training using an 80-20 training-validation split, and once it was satisfactory, to remove the validation set entirely and train on the complete set of images.
</p>
<p>
<img src="/images/training.png" alt="Fully using our dataset" style="max-width:70%; display:block; margin:auto;" />
</p>
<p>
Notice in the figure above, <code>x_train</code> and <code>y_train</code> are commented out, this is because we were using all letters to train our final competition model. Below is a sample of what our accuracy, loss and confusion matrix looked like when we actually had a split:
</p>
<p>
<img src="/images/trainval.png" alt="Training and validation graphs" style="max-width:100%; display:block; margin:auto;" />
</p>
<p>
<img src="/images/confusion.png" alt="Beautiful confusion matrix" style="max-width:100%; display:block; margin:auto;" />
</p>

<h4>Failure Cases</h4>
<p>
Occasionally, when segmenting the letters, there is enough overlap to cause a failed prediction. There was an attempt to solve this by intentionally training on overlapped images, however not enough was manually captured. Above, we discussed our performance during competition. Unluckily, one of our predictions failed as a result of this overlap; however, this is a rare event. 
<a href="https://drive.google.com/drive/folders/1jROyw9Q_FamL0aAo_l1EG_6aiC61KTwb?usp=sharing" target="_blank">You can view the individual letters that were used to train the model here</a>. You may notice some of them have a lot of overlap (by design).
</p>

<hr />

<h2>Conclusion</h2>

<h3>Performance During Competition</h3>
<p>
The robot performed almost as well as designed during competition. It correctly reported four different clues, teleported three times, and crossed the line once to a total of 18 points. Due to one misspelled clue, we were not able to maximize our points, but there was no catastrophic malfunction.
</p>

<h3>Unadopted Other Attempts</h3>
<p>
Notice, in the figure which shows the GUI, that there is a button labeled “Record” with a red light next to it. This was because due to conflicts integrating driving and clue detection together, I tried to quickly create an imitation learning model to navigate the robot. The record button would take screenshots every 100ms and create a CSV file which mapped the current linear and angular velocity of the robot to the image. Images were then fed into 
<a href="https://colab.research.google.com/drive/1jRNEESqv6ywCmLLXx__tK_0oSqThVjV7?usp=sharing" target="_blank">another CNN</a> with very similar architecture to the one used for training on letters. Surprisingly this method had accurately navigated the first segment of the road up to the second clue board. However, it became quickly apparent that we did not have the necessary compute (shoddy laptop :/) in order to use an imitation learning model in time for the competition, thus it was scrapped and the emergency teleportation method was used instead.
</p>

<h3>Improvements for Future</h3>
<p>
The primary area in need of improvement is the integration of clue detection and driving. We would have used a very wide angled camera so that the clues could be seen without stopping, and altered the homography such that it could undo the resulting distortion. This would also include getting the robot to reach the top of the hill and ironing out the CNN overlap issue. Secondly, there is a lot of potential to optimize the usage of nodes to separate actions which needed to occur simultaneously on the robot.
</p>

<hr />

<h2>Appendices</h2>

<h3>Referenced Material</h3>
<p>
All referenced material can be found on the ENPH 353 website. There, you will find access to eight labs which helped us in various ways for this project.
<br><br>
<a href="https://projectlab.engphys.ubc.ca/enph-353/" target="_blank">Here’s a link. It will likely update as months pass.</a>
</p>

<h3>Notable People</h3>
<p>
We would be remiss not to mention Daniel Song, Michael Khoo and Ebrahim Hussain who gave input regarding their previous experience in this course.<br><br>
Lastly, many discussions were had with Ella Yan (a colleague taking the course) particularly regarding image processing and how to implement an imitation learning model. We would like to give our flowers to her and her teammate Nora Shao for managing to implement their imitation learning model with severe time constraints.
</p>

<h3>ChatGPT Usage</h3>
<p>
ChatGPT was used to help implement ideas that we already had, and for debugging. Here is an example of how ChatGPT was used to help us troubleshoot making predictions.
</p>
<p>
<img src="/images/tensor.png" alt="Troubleshooting with ChatGPT" style="max-width:70%; display:block; margin:auto;" />
</p>
<p>
In fact, this was a notable conversation with ChatGPT, as it helped to reveal that there was a mismatch between the version of the model in Google Colab and the one used locally! (Took a while to figure out what was wrong.)
</p>
