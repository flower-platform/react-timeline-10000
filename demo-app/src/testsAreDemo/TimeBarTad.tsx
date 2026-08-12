import { Scenario, render } from "@famiprog-foundation/tests-are-demo";
import { Main } from "../stories/basic/Basic.stories";

export class TimeBarTad {

    async before() {
        render(<Main timeBarProps={{}} />)
    }

    /**
     * @img timebar.png
     * 
     * * The 2nd line always has a smaller time unit(interval) than the upper line
     * 
     * Default time units used:
     * 
     * @img default.png
     * 
     * Activation:
     * 
     * @img activate.png
     * 
     * Customization:
     * 
     * @img customize.png
     * 
     */
    @Scenario()
    async _quickInstructions() {
    }

}