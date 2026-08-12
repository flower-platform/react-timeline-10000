import { Scenario, render } from "@famiprog-foundation/tests-are-demo";
import { Main } from "../stories/basic/Basic.stories";
import { DayTimeUnit, HourTimeUnit, MinuteTimeUnit, TimeBarProps, Timeline } from "@famiprog-foundation/react-gantt";

export class TimeBarTad {

    async before() {
        render(<Main timeBarProps={{}} />)
    }

    /**
     * The `TimeBar` component displays time intervals across two distinct header rows (top and bottom).
     * 
     * **Note**: The 2nd row `always` has a smaller time unit (interval) than the top row.
     * 
     * @img timebar.png
     * 
     * ## Available Time Units:
     * 
     * @img default.png
     * 
     * ## Default Activation:
     * By default, both rows automatically calculate and select the optimal time unit based on the current view zoom level.
     *
     * @img activate.png
     * 
     * ## Customization:
     * Can explicitly configure the time units, formatting, and multipliers for both the top and bottom rows using `timeBarProps`.
     *
     * @img customize.png
     */
    @Scenario()
    async _quickInstructions() {
    }

}