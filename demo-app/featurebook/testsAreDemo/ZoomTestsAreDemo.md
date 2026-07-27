# Featurebook > ZoomTestsAreDemo.md
Go to [Featurebook > Index](../FEATUREBOOK.md)

## TOC

* [`@Scenario` `whenRightClickOnGanttArea()`](#whenRightClickOnGanttArea)
* [`@Scenario` `whenRightClickOnAnItem()`](#whenRightClickOnAnItem)
* [`@Scenario` `whenMaxZoomOutClickZoomOut()`](#whenMaxZoomOutClickZoomOut)
* [`@Scenario` `whenClickZoomIn()`](#whenClickZoomIn)
* [`@Scenario` `whenClickZoomOut()`](#whenClickZoomOut)
* [`@Scenario` `whenClickZoomReset()`](#whenClickZoomReset)
* [`@Scenario` `whenClickZoomEnabled()`](#whenClickZoomEnabled)

## Scenarios

<a id="whenRightClickOnGanttArea"></a>
<table>
<tr><td> 

`@Scenario` `whenRightClickOnGanttArea()`<br />
</td></tr>
<tr><td>

* WHEN right click on gantt area
* THEN the zoom actions are available on the CM
</td></tr>
</table>

<a id="whenRightClickOnAnItem"></a>
<table>
<tr><td> 

`@Scenario` `whenRightClickOnAnItem()`<br />
</td></tr>
<tr><td>

* WHEN right click on an item
* THEN the zoom actions are not available on the CM
</td></tr>
</table>

<a id="whenMaxZoomOutClickZoomOut"></a>
<table>
<tr><td> 

`@Scenario` `whenMaxZoomOutClickZoomOut()`<br />**WHEN the gantt was maxim zoom out AND click on zoom out, THEN the startDate and endDate not changed**
</td></tr>

</table>

<a id="whenClickZoomIn"></a>
<table>
<tr><td> 

`@Scenario` `whenClickZoomIn()`<br />**When click zoomIn from context menu, THEN zoomed in AND show the message `Zoomed in` with fade effect.**
</td></tr>

</table>

<a id="whenClickZoomOut"></a>
<table>
<tr><td> 

`@Scenario` `whenClickZoomOut()`<br />**When click zoomOut from context menu, THEN zoomed out AND show the message `Zoomed out` with fade effect.**
</td></tr>

</table>

<a id="whenClickZoomReset"></a>
<table>
<tr><td> 

`@Scenario` `whenClickZoomReset()`<br />**When click zoomReset from context menu, THEN zoomed reset AND show the message `Zoom reset` with fade effect.**
</td></tr>

</table>

<a id="whenClickZoomEnabled"></a>
<table>
<tr><td> 

`@Scenario` `whenClickZoomEnabled()`<br />**When `Zoom enabled` is checked/unchecked AND we click zoomIn/zoomOut from context menu, THEN the gantt zooms/ doesn't zoom in accordingly**
</td></tr>

</table>
