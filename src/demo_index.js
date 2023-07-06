'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import DemoTimeline from 'demo';
import {TestsAreDemoAppWrapper} from '@famiprog-foundation/tests-are-demo';
import {tad} from '@famiprog-foundation/tests-are-demo';
import {ExpTestsAreDemo} from './testsAreDemo/ExpTestsAreDemo';
import {DragToCreateTestsAreDemo} from './testsAreDemo/DragToCreateTestsAreDemo';
import {SelectedItemsTestsAreDemo} from './testsAreDemo/SelectedItemsTestsAreDemo';

ReactDOM.render(
  <TestsAreDemoAppWrapper
    importSemanticUiCss
    app={<DemoTimeline />}
    importTestsCallback={() => {
      tad.addTests(DragToCreateTestsAreDemo, ExpTestsAreDemo, SelectedItemsTestsAreDemo);
    }}
  />,
  document.getElementById('root')
);
