import { Select, type ListCollection } from '@chakra-ui/react';

import type { LabelValueType } from '@/utils/types';

export type SelectValue = {
  value: string;
};

export type SelectCustomProps = {
  collention: ListCollection<LabelValueType>;
  onSelect: (value: SelectValue) => void;
  placeholder: string;
};

export function SelectCustom({
  collention,
  placeholder,
  onSelect,
}: SelectCustomProps) {
  return (
    <Select.Root onSelect={onSelect} collection={collention} deselectable>
      <Select.Label>Selecione a safra:</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Select.Trigger />

      <Select.Content>
        {collention.items.map((crop) => (
          <Select.Item key={crop.value} item={crop}>
            {crop.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
