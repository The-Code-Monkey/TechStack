import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { expect, describe, it } from "bun:test";

import lazy from './';

const { Suspense } = React;

interface Props {
  text: string;
}

function Text(props: Props) {
  return <>{props.text}</>;
}

async function fakeImport(result: any) {
  return { test: result };
}

describe('useWhyChange', () => {
  it('stays quiet if updates never happen', async () => {
    const LazyText = await lazy(() => fakeImport(Text), 'test');

    const { asFragment, container } = render(
      <Suspense fallback={<Text text='Loading...' />}>
        <LazyText text='hi' />
      </Suspense>
    );

    expect(asFragment()).toMatchSnapshot();

    await screen.findByText('hi');

    expect(asFragment()).toMatchSnapshot();
  });
});
