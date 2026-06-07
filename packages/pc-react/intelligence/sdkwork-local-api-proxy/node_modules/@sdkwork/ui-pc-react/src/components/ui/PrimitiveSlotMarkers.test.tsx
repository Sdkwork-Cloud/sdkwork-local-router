import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { Progress } from './progress';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { ScrollArea } from './scroll-area';
import { Separator } from './separator';
import { Slider } from './slider';
import { Switch } from './switch';
import { Textarea } from './textarea';

function queryUi(name: string) {
  return document.body.querySelector(`[data-sdk-ui="${name}"]`);
}

function querySlot(name: string) {
  return document.body.querySelector(`[data-slot="${name}"]`);
}

afterEach(() => {
  cleanup();
});

describe('Primitive slot markers', () => {
  it('publishes stable slot markers for leaf and lightweight anatomy primitives', () => {
    render(
      <div>
        <Button>Save</Button>
        <Avatar>
          <AvatarImage alt="Workspace" src="/workspace.png" />
          <AvatarFallback>WS</AvatarFallback>
        </Avatar>
        <Badge>Live</Badge>
        <Checkbox aria-label="Compact density" defaultChecked />
        <Label htmlFor="sdk-email">Email</Label>
        <Progress value={40} />
        <RadioGroup defaultValue="comfortable">
          <RadioGroupItem aria-label="Comfortable density" value="comfortable" />
        </RadioGroup>
        <ScrollArea className="h-10 w-10" type="always">
          <div className="h-24 w-24">Scrollable</div>
        </ScrollArea>
        <Separator />
        <Switch aria-label="Enable automation" checked />
        <Slider aria-label="Volume" defaultValue={[50]} />
        <Textarea aria-label="Notes" defaultValue="Framework notes" />
      </div>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute('data-slot', 'button');
    expect(queryUi('avatar')).toHaveAttribute('data-slot', 'avatar');
    expect(queryUi('avatar-fallback')).toHaveAttribute('data-slot', 'avatar-fallback');
    expect(screen.getByText('Live')).toHaveAttribute('data-slot', 'badge');
    expect(screen.getByRole('checkbox', { name: 'Compact density' })).toHaveAttribute('data-slot', 'checkbox');
    expect(querySlot('checkbox-indicator')).toBeInTheDocument();
    expect(screen.getByText('Email')).toHaveAttribute('data-slot', 'label');
    expect(queryUi('progress')).toHaveAttribute('data-slot', 'progress');
    expect(queryUi('progress-indicator')).toHaveAttribute('data-slot', 'progress-indicator');
    expect(queryUi('radio-group')).toHaveAttribute('data-slot', 'radio-group');
    expect(screen.getByRole('radio', { name: 'Comfortable density' })).toHaveAttribute('data-slot', 'radio-group-item');
    expect(querySlot('radio-group-indicator')).toBeInTheDocument();
    expect(queryUi('scroll-area')).toHaveAttribute('data-slot', 'scroll-area');
    expect(querySlot('scroll-area-viewport')).toBeInTheDocument();
    expect(queryUi('scroll-bar')).toHaveAttribute('data-slot', 'scroll-bar');
    expect(queryUi('separator')).toHaveAttribute('data-slot', 'separator');
    expect(screen.getByRole('switch', { name: 'Enable automation' })).toHaveAttribute('data-slot', 'switch');
    expect(querySlot('switch-thumb')).toBeInTheDocument();
    expect(queryUi('slider')).toHaveAttribute('data-slot', 'slider');
    expect(querySlot('slider-track')).toBeInTheDocument();
    expect(querySlot('slider-range')).toBeInTheDocument();
    expect(querySlot('slider-thumb')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('data-slot', 'textarea');
  });
});
