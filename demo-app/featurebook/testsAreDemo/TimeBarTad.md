# Featurebook > TimeBarTad.md
Go to [Featurebook > Index](../FEATUREBOOK.md)

## TOC

* [`@Scenario` `_quickInstructions()`](#_quickInstructions)

## Scenarios

<a id="_quickInstructions"></a>
<table>
<tr><td> 

`@Scenario` `_quickInstructions()`<br />
</td></tr>
<tr><td>

The `TimeBar` component displays time intervals across two distinct header rows (top and bottom).

**Note**: The 2nd row `always` has a smaller time unit (interval) than the top row.

![timebar.png](../../featurebook-img/testsAreDemo/TimeBarTad/_quickInstructions/timebar.png)

## Available Time Units:

![default.png](../../featurebook-img/testsAreDemo/TimeBarTad/_quickInstructions/default.png)

## Default Activation:
By default, both rows automatically calculate and select the optimal time unit based on the current view zoom level.

![activate.png](../../featurebook-img/testsAreDemo/TimeBarTad/_quickInstructions/activate.png)

## Customization:
Can explicitly configure the time units, formatting, and multipliers for both the top and bottom rows using `timeBarProps`.

![customize.png](../../featurebook-img/testsAreDemo/TimeBarTad/_quickInstructions/customize.png)
</td></tr>
</table>
