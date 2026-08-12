'use strict';

import ReactDOM from 'react-dom';

import '@famiprog-foundation/react-gantt/style.css';
import './stories/storybook.css';

import { tad, TestsAreDemoAppWrapper } from '@famiprog-foundation/tests-are-demo';
import DemoTimeline from './demo';
import { BackgroundLayersTestsAreDemo } from './testsAreDemo/BackgroundLayersTestsAreDemo';
import { ContextMenuTestsAreDemo } from './testsAreDemo/ContextMenuTestsAreDemo';
import { DisplayItemOnSeparateRowIfOverlapTestsAreDemo } from './testsAreDemo/DisplayItemOnSeparateRowIfOverlapTestsAreDemo';
import { DragToCreateTestsAreDemo } from './testsAreDemo/DragToCreateTestsAreDemo';
import { DynamicConfigurationTestsAreDemo } from './testsAreDemo/DynamicConfigurationTestsAreDemo';
import { NowMarkerTestsAreDemo } from './testsAreDemo/NowMarkerTestsAreDemo';
import { SelectedItemsTestsAreDemo } from './testsAreDemo/SelectedItemsTestsAreDemo';
import { TableTestsAreDemo } from './testsAreDemo/TableTestsAreDemo';
import { TimeBarTad } from './testsAreDemo/TimeBarTad';
import { ZoomTestsAreDemo } from './testsAreDemo/ZoomTestsAreDemo';

ReactDOM.render(
  <TestsAreDemoAppWrapper
    importSemanticUiCss
    app={<DemoTimeline />}
    importTestsCallback={() => {
      tad.addTests(
        BackgroundLayersTestsAreDemo,
        ContextMenuTestsAreDemo,
        DisplayItemOnSeparateRowIfOverlapTestsAreDemo,
        DragToCreateTestsAreDemo,
        DynamicConfigurationTestsAreDemo,
        NowMarkerTestsAreDemo,
        SelectedItemsTestsAreDemo,
        TableTestsAreDemo,
        TimeBarTad,
        ZoomTestsAreDemo
      );
    }}
  />,
  document.getElementById('root')
);
