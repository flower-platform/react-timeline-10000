import { Timeline, timelineTestids as testids } from "@famiprog-foundation/react-gantt";
import { Scenario, ScenarioOptions, render, tad } from "@famiprog-foundation/tests-are-demo";
import { assert } from "chai";
import { Selection, selectionStoryTestIds } from "../stories/contextMenuAndSelection/ContextMenuAndSelection.stories";
import { someTasks } from "../stories/sampleData";
import { rightClick } from "./testUtils";

/**
* @author Daniela Buzatu
*/
export class SelectedItemsTestsAreDemo {
    async before() {
        // Forces any previous TAD story (e.g. DragToCreate's Main) before mounting Selection.
        // Going straight to render (<Selection />) leave interact.js in a bad state 
        // and interact drag events aren't triggered by tad.drag() 
        // Drag to select doesn't work without rendering this empty component.
        render(<></>);
        render(<Selection />);
    }

    @Scenario("WHEN click on a segment, THEN only that segment is selected")
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenClickOnASegment() {
        // WHEN left click, THEN element is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_2"));
        await this.assertOnlyExpectedSegmentsAreSelected([2]);

        //=======HIDDEN TESTS (Not interesting for the user)==========
        tad.demoForEndUserHide();

        // WHEN left click again on same element, THEN the same element is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_2"));
        await this.assertOnlyExpectedSegmentsAreSelected([2], true);
        
        // ==Right click can be used also for selecting segments. It works the same as left click (except that right click on a selected segment doesn't change the selection)== 
        // GIVEN nothing is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));

        // WHEN right click, THEN element is selected
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_4"));
        await this.assertOnlyExpectedSegmentsAreSelected([4], true);

        // WHEN right click again on another element, THEN the new element is selected
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_5"));
        await this.assertOnlyExpectedSegmentsAreSelected([5], true);

        // WHEN right click again on same element, THEN the same element is selected
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_5"));
        await this.assertOnlyExpectedSegmentsAreSelected([5], true);

        // GIVEN many segments are selected, WHEN right click one of them THEN the selection doesn't change
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_1"));
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_2"), { ctrlKey: true });
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_1"));
        await this.assertOnlyExpectedSegmentsAreSelected([1, 2], true);
        
        // restore selection for the next scenario
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_2"));
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN click on another segment, THEN only that segment is selected (so the previously selected segment is no more selected)")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenClickAnotherSegment() {
        tad.cc(undefined);
         // WHEN left click again on another element, THEN the new element is selected
         await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_3"));
         await this.assertOnlyExpectedSegmentsAreSelected([3]);
    }

    @Scenario("WHEN CTRL + click on a segment, THEN that segment is ADDED to the selection, AND both are now selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLClickOnASegment() {
        // left click + CTRL on another element, THEN the new element is added to selection
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_0"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        tad.demoForEndUserHide();

        // WHEN left click + SHIFT on another element, THEN the new element is added to selection
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_4"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4], true);

        // WHEN left click + SHIFT on same element, THEN the element is removed from selection
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_4"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);

        // WHEN right click + CTRL on another element, THEN the new element is added to selection
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_4"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4], true);

        // WHEN right click + CTRL on same element, THEN the selection doesn't change
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_4"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4], true);

        // WHEN right click + SHIFT on another element, THEN the new element is added to selection
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_5"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4, 5], true);

        // WHEN right click + SHIFT on same element, THEN the selection doesn't change
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_5"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4, 5], true);

        // restore selection for the next scenario
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_0"));
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_3"), { ctrlKey: true });
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN CTRL + click on a selected segment, THEN that segment is REMOVED from the selection, AND only one is now selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLClickOnASelectedSegment() {
        // WHEN left click + CTRL on same element, THEN the element is removed from selection
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_3"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0]);
    }

    @Scenario("WHEN CTRL + click outside segments, THEN the selection doesn't change")
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenCTRLClickOutside() {
        // When I click outside + Ctrl key, THEN selection doesn't change
        tad.cc("Click outside with CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0]);

        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Same as CLICK + CTRL outside any segment works: CLICK + SHIFT, RIGHT CLICK + CTRL, RIGHT CLICK + SHIFT outside any segment
        await tad.demoForEndUserHide()
        // WHEN I click outside + Shift key, THEN selection doesn't change
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);

        // WHEN I right click outside + Ctrl key, THEN selection doesn't change
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);

        // WHEN I click outside + Shift key, THEN selection doesn't change
        rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN click outside segments, THEN the selection becomes empty")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenClickOutside() {
         // WHEN left click on row, THEN no segment is selected
         tad.cc("Left click outside any segment");
         await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));
         await tad.showSpotlight({ message: "No segment is selected", focusOnLastElementCaptured: false });
         await this.assertOnlyExpectedSegmentsAreSelected([]);
 
         //=======HIDDEN TESTS (Not interesting for the user)==========
         // GIVEN a segment is selected
         tad.demoForEndUserHide();
         rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_2"));
         // WHEN right click on row, THEN no segment is selected
         rightClick(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));
         await this.assertOnlyExpectedSegmentsAreSelected([], true);
         tad.demoForEndUserShow();
    }

    @Scenario("WHEN drag a selection rectangle over 2 segments, THEN only those 2 segments are selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenDragASelectionRectangleOverTwoSegments() {
        await tad.showSpotlight({ message: "I drag to select segment 0 and 3 with left mouse button", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 1, 3, 3);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3]);
    }
    
    @Scenario("WHEN drag a selection rectangle over another segment, THEN only that segment is selected (so the previous 2 segments are not selected any more")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenDragASelectionRectangleOverAnotherSegment() {
        await tad.showSpotlight({ message: "I drag to select segment 3 with left mouse button", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 1, 3, 3);
        await this.assertOnlyExpectedSegmentsAreSelected([3]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Using right mouse button works the same
        tad.demoForEndUserHide();
        // GIVEN nothing selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));

        await this.dragToSelect(0, 1, 3, 3, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);

        await this.dragToSelect(1, 1, 3, 3, true);
        await this.assertOnlyExpectedSegmentsAreSelected([3], true);
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN hold CTRL + drag a selection rectangle over another segment, THEN that segment is ADDED to the selection, AND both are now selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLDragASelectionRectangleOverAnotherSegment() {
        tad.cc(undefined);
        await tad.showSpotlight({ message: "I draw a rectangle containing segment 0", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 0, 0, 0, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3]);
    }

    @Scenario("WHEN hold CTRL + drag a selection rectangle over an already selected segment, THEN that segment is REMOVED from the selection, AND only one is selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLDragASelectionRectangleOverAlreadySelectedSegment() {
        await tad.showSpotlight({ message: "I draw a rectangle containing segment 0 with LEFT mouse button and CTRL pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 1, 3, 3, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0]);

        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Same as LEFT button + CTRL works: LEFT + SHIFT, RIGHT + CTRL, RIGHT + SHIFT
        tad.demoForEndUserHide();
        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));
         // WHEN I draw a rectangle containing segments 0, 3 with LEFT mouse button and SHIFT pressed, THEN segments 0, 3 are added to selection
        await this.dragToSelect(0, 1, 3, 3, true, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);
        // WHEN I draw a rectangle containing segment 3  with RIGHT mouse button and CTRL pressed, THEN segment 3 is unselected
        await this.dragToSelect(1, 1, 3, 3, true, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);

        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));
        // WHEN I draw a rectangle containing segments 0, 3 with LEFT mouse button and SHIFT pressed, THEN segments 0, 3 are selected
        await this.dragToSelect(0, 1, 3, 3, false, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);
        // WHEN I draw a rectangle containing segment 3  with LEFT mouse button and SHIFT pressed, THEN segment 3 is unselected 
        await this.dragToSelect(1, 1, 3, 3, false, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);

        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));
        // WHEN I draw a rectangle containing segments 0, 3 with RIGHT mouse button and SHIFT pressed, THEN segments 0, 3 are selected
        await this.dragToSelect(0, 1, 3, 3, true, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);
        // WHEN I draw a rectangle containing segment 3  with RIGHT mouse button and SHIFT pressed, , THEN segment 3 is unselected
        await this.dragToSelect(1, 1, 3, 3, true, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);

        // Select again the segment 0
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_1"));
        await this.dragToSelect(0, 0, 0, 0, false, true);

        tad.demoForEndUserShow();
    }

    @Scenario("WHEN hold CTRL + drag a selection rectangle over an empty area, THEN the selection doesn't change")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLDragASelectionRectangleOverAnEmptyArea() {
        tad.cc(undefined);
        await tad.showSpotlight({ message: "WHEN hold CTRL + drag a selection rectangle over an empty area, THEN the selection doesn't change", focusOnLastElementCaptured: false });
        let startingRow = tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_0");
        tad.getObjectViaCheat(Timeline, 'r9k1').dragStart(startingRow, 5);
        await tad.getObjectViaCheat(Timeline, 'r9k1').dragMove(10, 10, 5);
        tad.getObjectViaCheat(Timeline, 'r9k1').dragEnd({ctrlKey: true});
        await this.assertOnlyExpectedSegmentsAreSelected([0]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Using right mouse button + CTRL works the same
        tad.demoForEndUserHide();
        let row = tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_0");
        await tad.fireEventWaitable.mouseDown(row, { clientX: row.getBoundingClientRect().x + 5, clientY: row.getBoundingClientRect().y + 5, button: 2, ctrlKey: true });
        await tad.fireEventWaitable.mouseMove(row, { clientX: 10, clientY: 10, pageX: 10, ctrlKey: true });
        await tad.fireEventWaitable.mouseUp(row, { button: 2, ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN drag a selection rectangle over an empty area, THEN the selection becomes empty") 
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenDragASelectionRectangleOverAnEmptyArea() {
        tad.cc(undefined);
        await tad.showSpotlight({ message: "I drag to select outside any segments (using left mouse button)", focusOnLastElementCaptured: false });
        let startingRow = tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_0");
        tad.getObjectViaCheat(Timeline, 'r9k1').dragStart(startingRow, 5);
        await tad.getObjectViaCheat(Timeline, 'r9k1').dragMove(10, 10, 5);
        tad.getObjectViaCheat(Timeline, 'r9k1').dragEnd();
        await tad.showSpotlight({ message: "No segment is selected", focusOnLastElementCaptured: false });
        await this.assertOnlyExpectedSegmentsAreSelected([]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Using right mouse button works the same
        tad.demoForEndUserHide();
        // given a selected segment
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_3"));

        let row = tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_0");
        await tad.fireEventWaitable.mouseDown(row, { clientX: row.getBoundingClientRect().x + 5, clientY: row.getBoundingClientRect().y + 5, button: 2 });
        await tad.fireEventWaitable.mouseMove(row, { clientX: 10, clientY: 10, pageX: 10 });
        await tad.fireEventWaitable.mouseUp(row, { button: 2 });
        await this.assertOnlyExpectedSegmentsAreSelected([], true);
        tad.demoForEndUserShow();
    }

    /**
     * * GIVEN The `allowSelectionRectangleFromItems` checkbox is toggled (default)
     * * WHEN I drag to select an item starting from an item
     * * THEN that item is selected 
     */
    @Scenario() 
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenDragASelectionRectangleStartingFromAnItem1() {
        // reset the selection first
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_0"));
        tad.ref("GIVEN");
        tad.ref("WHEN");
        await this.dragToSelect(0, 1, 0, 3, false, false, false, true);
        tad.ref("THEN");
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);
    }
    
    /**
     * * GIVEN The `allowSelectionRectangleFromItems` checkbox is untoggled
     * * WHEN I drag to select an item starting from an item
     * * THEN nothing is selected
     */
    @Scenario() 
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenDragASelectionRectangleStartingFromAnItem2() {
        // await tad.userEventWaitable.click(tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_0"));
        tad.ref("GIVEN");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(selectionStoryTestIds.allowSelectionRectangleFromItemsCheckbox));
        tad.ref("WHEN");
        await this.dragToSelect(0, 1, 0, 3, false, false, false, true);
        tad.ref("THEN");
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////// Helper methods
    ////////////////////////////////////////////////////////////////////////////////////////

    async dragToSelect(startingRowIndex, endingRowIndex, startingSegmentIndex, endingSegmentIndex, rightClick?, ctrlKey = false, shiftKey = false, startOnTopOfSegment = false) {
        let startingRow = tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_" + startingRowIndex);
        let endingRow = tad.screenCapturing.getByTestId('r9k1_' + testids.row + "_" + endingRowIndex);
        let startingSegment = tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_" + startingSegmentIndex);
        const endingSegmentRect = tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_" + endingSegmentIndex).getBoundingClientRect();
        
        const dragParams = { 
            from: { x: startingSegment.getBoundingClientRect().x, y: Math.ceil(startingRow.getBoundingClientRect().y) }, 
            to: { x: endingSegmentRect.x + endingSegmentRect.width, y: endingRow.getBoundingClientRect().y + endingRow.getBoundingClientRect().height - 5 }, 
            options: { button: rightClick ? 2 : 0, ctrlKey: ctrlKey, shiftKey: shiftKey } 
        }
        const dragTarget = startOnTopOfSegment ? startingSegment : startingRow;
        await tad.drag(dragTarget, dragParams);  
    }

    async assertOnlyExpectedSegmentsAreSelected(expectedSelectedSegments: number[], demoForEndUserHide?) {
        for (var i = 0; i < someTasks.length; i++) {
            const segment = tad.screenCapturing.getByTestId('r9k1_' + testids.item + "_" + i);
            if (expectedSelectedSegments.indexOf(i) >= 0) {
                tad.cc("Segment " + i + " is selected (has resize anchors, brighter color and shadow effect)");
                // await tad.assertWaitable.include(Array.from(segment.classList), "rct9k-items-outer-selected");
                assert.include(Array.from(segment.classList), "rct9k-items-outer-selected");
            } else {
                tad.demoForEndUserHide();
                // await tad.assertWaitable.notInclude(Array.from(segment.classList), "rct9k-items-outer-selected");
                assert.notInclude(Array.from(segment.classList), "rct9k-items-outer-selected");
                !demoForEndUserHide && tad.demoForEndUserShow();
            }
        }

        assert.equal(tad.screenCapturing.getByTestId(selectionStoryTestIds.selectedItemsSpan).textContent, expectedSelectedSegments.sort().join(", "));
    }
}