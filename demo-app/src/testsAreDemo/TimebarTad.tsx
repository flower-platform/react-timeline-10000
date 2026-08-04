import { Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import { Main } from "../stories/basic/Basic.stories";

export class TimebarTad {

    async before() {
        render(<Main />);
    }

}