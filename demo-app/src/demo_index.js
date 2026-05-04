'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import './stories/storybook.css';
import '@famiprog-foundation/react-gantt/style.css';

import DemoTimeline from './demo';
import {TestsAreDemoAppWrapper} from '@famiprog-foundation/tests-are-demo';
import {tad} from '@famiprog-foundation/tests-are-demo';
import {DragToCreateTestsAreDemo} from './testsAreDemo/DragToCreateTestsAreDemo';
import {TableTestsAreDemo} from './testsAreDemo/TableTestsAreDemo';
import {SelectedItemsTestsAreDemo} from './testsAreDemo/SelectedItemsTestsAreDemo';
import {ContextMenuTestsAreDemo} from './testsAreDemo/ContextMenuTestsAreDemo';
import {DynamicConfigurationTestsAreDemo} from './testsAreDemo/DynamicConfigurationTestsAreDemo';
import { BackgroundLayersTestsAreDemo } from './testsAreDemo/BackgroundLayersTestsAreDemo';
import { DisplayItemOnSeparateRowIfOverlapTestsAreDemo } from './testsAreDemo/DisplayItemOnSeparateRowIfOverlapTestsAreDemo';
import { ZoomTestsAreDemo } from './testsAreDemo/ZoomTestsAreDemo';
import { NowMarkerTestsAreDemo } from './testsAreDemo/NowMarkerTestsAreDemo';

ReactDOM.render(
  <TestsAreDemoAppWrapper
    importSemanticUiCss
    app={<DemoTimeline />}
    importTestsCallback={() => {
      tad.addTests(
        DragToCreateTestsAreDemo,
        SelectedItemsTestsAreDemo,
        ContextMenuTestsAreDemo,
        TableTestsAreDemo,
        DynamicConfigurationTestsAreDemo,
        BackgroundLayersTestsAreDemo,
        NowMarkerTestsAreDemo,
        DisplayItemOnSeparateRowIfOverlapTestsAreDemo,
        ZoomTestsAreDemo
      );
    }}
  />,
  document.getElementById('root')
);
