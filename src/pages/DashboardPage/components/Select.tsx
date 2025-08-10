import { Portal, Select, type ListCollection } from '@chakra-ui/react';

import type { LabelValueType } from '@/utils/types';

export type SelectValue = {
  value: string;
};

export type SelectCustomProps = {
  collention: ListCollection<LabelValueType>;
  placeholder: string;
  onSelect: (value: SelectValue) => void;
  onClear: () => void;
};

export function SelectCustom({
  collention,
  placeholder,
  onSelect,
  onClear,
}: SelectCustomProps) {
  return (
    <Select.Root onSelect={onSelect} collection={collention}>
      <Select.Label>Selecione a safra:</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger onClick={onClear} />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collention.items.map((crop) => (
              <Select.Item key={crop.value} item={crop}>
                {crop.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
