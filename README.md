# FinalProject

Name: Jerome Benasfre
UCINETID: benasfrj
StudentID: 25097522

## Running Project
	Ensure that flex-layout, angular material, and chart js is installed.
	If not, cd into project folder and npm install

	Once all dependencies are installed, run ng serve --open and click the load data button.
	The data should be loaded under 1 minute.

## Changes from plan

	Some of the requirements I listed are not supported by the API. For example, vehicles don't have values saved as all time, monthly, weekly, and daily.
	Also, I changed showing yearly to showing all time as that is the standard for planetside stat trackers I have seen.

	I have also decided to add a graph of the class of enemies who killed the player, and have decided to not display all time, monthly, weekly, daily 
	for all stats related to kills and deaths. Instead, there is an overall graph where players can see each time frame, and an all time graph for
	specific kills/deaths such as class kills.

	I could not get toggle to work, however, so all time frame graphs are displayed.

## Citation

FLEX LAYOUT & ANGULAR MATERIAL
https://github.com/angular/flex-layout
https://tburleson-layouts-demos.firebaseapp.com/#/docs
https://www.youtube.com/watch?v=iWYP3NtKQjs

https://material.angular.io/components/

CHART JS
https://www.chartjs.org/
https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#2-line-chart
https://www.youtube.com/watch?v=ZCYiUCcTo20

API CALLS
https://www.youtube.com/watch?v=rdLJNGZvlAA
http://census.daybreakgames.com/

STAT VIEWERS
https://ps2.fisu.pw/player/?name=aryken&show=statistics
In game stat viewer

