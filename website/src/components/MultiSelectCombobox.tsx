import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import type { PropertyBadge } from "@/interfaces/properties";
import { PROPERTY_BADGES } from "@/interfaces/properties";

interface MultiSelectComboboxProps {
  label?: string;
  propertyBadges?: PropertyBadge[]
  options: string[];
  selected: string[];
  setSelected: (v: string[]) => void;
  placeholder?: string;
}

export function MultiSelectCombobox({
  label,
  options,
  selected,
  setSelected,
  placeholder,
}: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false);

  function handleSelect(option: string) {
    if (selected.includes(option)) {
      setSelected(selected.filter((v) => v !== option));
    } else {
      setSelected([...selected, option]);
    }
  }

  // Show max 2 chips, then "+N more"
  const maxChips = 2;
  const visibleSelected = selected.slice(0, maxChips);
  const moreCount = selected.length - maxChips;

  return (
    <div>
        {label && <div className="block text-xs mb-1 text-gray-500 text-left p-1 w-full">{label}</div>}
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                className="w-[220px] min-h-[2.4rem] px-2 flex items-center"
                type="button"
            >
                <div className="flex flex-nowrap items-center gap-1 overflow-hidden min-w-0 flex-1">
                {selected.length === 0 && (
                    <span className="truncate text-gray-400">{placeholder || "Select options"}</span>
                )}
                {visibleSelected.map((sel) => {
                    const badge = PROPERTY_BADGES.find((p) => p.key === sel);
                    return (
                    <span
                        key={sel}
                        className={`px-2 py-0.5 rounded text-xs font-medium min-w-0 max-w-[85px] truncate ${badge ? badge.color : ""}`}
                        style={{ flexShrink: 1 }}
                    >
                        {badge ? badge.label : sel}
                    </span>
                    );
                })}
                {moreCount > 0 && (
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs font-medium ml-auto flex-shrink-0">
                    +{moreCount} more
                    </span>
                )}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0">
            <Command>
                <CommandGroup>
                {options.map((option) => {
                    const badge = PROPERTY_BADGES.find((p) => p.key === option);
                    return (
                        <CommandItem
                            key={option}
                            onSelect={() => handleSelect(option)}
                            className="cursor-pointer"
                        >
                            <Check
                                className={`mr-2 h-4 w-4 ${selected.includes(option) ? "opacity-100" : "opacity-0"}`}
                            />
                            <span className={badge ? `${badge.color} px-2 py-0.5 rounded` : ""}>
                                {badge ? badge.label : option}
                            </span>
                        </CommandItem>
                    );
                })}
                </CommandGroup>
            </Command>
            </PopoverContent>
        </Popover>
    </div>
  );
}
