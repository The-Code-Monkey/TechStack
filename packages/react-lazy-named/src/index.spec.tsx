import { render, screen } from '@testing-library/react';
import * as React from 'react';

import lazy from './index';

const { Suspense } = React;

function Text(props) {
  return props.text;
}

async function fakeImport(result) {
  return { test: result };
}

describe('useWhyChange', () => {
  it('stays quiet if updates never happen', async () => {
    const LazyText = await lazy(() => fakeImport(Text), 'test');

    const { asFragment } = render(
      <Suspense fallback={<Text text="Loading..." />}>
        <LazyText text="hi" />
      </Suspense>
    );

    expect(asFragment()).toMatchSnapshot();

    await screen.findByText('hi');

    expect(asFragment()).toMatchSnapshot();
  });
});
