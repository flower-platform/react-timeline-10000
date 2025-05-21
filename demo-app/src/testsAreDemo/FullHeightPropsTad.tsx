import { Scenario } from "@famiprog-foundation/tests-are-demo";



export class OrganizationTadBase {

    /**
     * @img image.png
     * 
     * 1) Empty lines, without data
     * 2) Toggle the **fullHeight** props
     */
    @Scenario("")
    _quickInstructions() {
    }

    /**
     * GIVEN lines height smaller than screen height
     * 
     * WHEN1 **fullHeight** props is false
     * 
     * THEN1 the gantt height = time bar height + lines height
     * 
     * WHEN2 **fullHeight** props is true
     * 
     * THEN2 the gantt height = the screen height
     * 
     */

    @Scenario("")
    async whenFullHeightProps() {
    }

}
