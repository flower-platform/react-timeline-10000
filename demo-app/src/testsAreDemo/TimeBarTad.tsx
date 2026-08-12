import { Scenario, render } from "@famiprog-foundation/tests-are-demo";
import { Main } from "../stories/basic/Basic.stories";

export class TimeBarTad {

    async before() {
        render(<Main timeBarProps={{}} />)
    }

    /**
     * @img timebar.png
     * 
     * * The 2nd line `always` has a smaller time unit (interval) than the upper line
     * 
     * Default time units used:
     * 
     * @img default.png
     * 
     * ## Activation
     * Both lines use the default to determine the optimal time unit
     * 
     * @img activate.png
     * 
     * ## Customization:
     * Can set the label, the multiplier, and the time units to be used for the top and bottom lines
     * @img customize.png
     * 
     */
    @Scenario()
    async _quickInstructions() {
    }

}