import * as React from "react";
import { GoCircleSlash } from "react-icons/go";
import { Button, wrapFieldsWithMeta } from "tinacms";
import { Popover, Transition } from "@headlessui/react";
import { Icon, IconOptions } from "../../components/util/icon";
import { BiChevronRight } from "react-icons/bi";

const parseIconName = (name: string) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};

export const IconPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [filter, setFilter] = React.useState("");
  const filteredBlocks = React.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);

  const inputLabel = Object.keys(IconOptions).includes(input.value)
    ? parseIconName(input.value)
    : "Select Icon";
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;

  return (
    <div className="relative z-[1000]">
      <input type="text" id={input.name} className="hidden" {...input} />
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button as={"span"}>
              <Button
                className={`text-sm h-11 px-4 ${InputIcon ? "h-11" : "h-10"}`}
                size="custom"
                rounded="full"
                variant={open ? "secondary" : "white"}
              >
                {InputIcon && (
                  <InputIcon className="h-auto mr-1 text-blue-500 fill-current w-7" />
                )}
                {inputLabel}
                {!InputIcon && (
                  <BiChevronRight className="w-5 h-auto ml-1 fill-current opacity-70" />
                )}
              </Button>
            </Popover.Button>
            <div
              className="absolute w-full min-w-[192px] max-w-2xl -bottom-2 left-0 translate-y-full"
              style={{ zIndex: 1000 }}
            >
              <Transition
                enter="transition duration-150 ease-out"
                enterFrom="transform opacity-0 -translate-y-2"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition duration-75 ease-in"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-2"
              >
                <Popover.Panel className="relative z-50 overflow-hidden bg-white border rounded-lg shadow-lg border-gray-150">
                  {({ close }) => (
                    <div className="max-h-[24rem] flex flex-col w-full h-full">
                      <div className="z-10 p-2 border-b border-gray-100 shadow-sm bg-gray-50">
                        <input
                          type="text"
                          className="bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200"
                          onClick={(event: any) => {
                            event.stopPropagation();
                            event.preventDefault();
                          }}
                          value={filter}
                          onChange={(event: any) => {
                            setFilter(event.target.value);
                          }}
                          placeholder="Filter..."
                        />
                      </div>
                      {filteredBlocks.length === 0 && (
                        <span className="relative px-2 py-3 text-xs italic text-center text-gray-300 bg-gray-50">
                          No matches found
                        </span>
                      )}
                      {filteredBlocks.length > 0 && (
                        <div className="grid w-full grid-cols-6 p-2 overflow-y-auto auto-rows-auto">
                          <button
                            className="relative flex-1 px-3 py-2 text-xs text-center transition-all duration-150 ease-out rounded-lg outline-none hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                            key={"clear-input"}
                            onClick={() => {
                              input.onChange("");
                              setFilter("");
                              close();
                            }}
                          >
                            <GoCircleSlash className="w-6 h-auto text-gray-200" />
                          </button>
                          {filteredBlocks.map((name) => {
                            return (
                              <button
                                className="relative flex items-center justify-center flex-1 px-3 py-2 text-xs text-center transition-all duration-150 ease-out rounded-lg outline-none hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50"
                                key={name}
                                onClick={() => {
                                  input.onChange(name);
                                  setFilter("");
                                  close();
                                }}
                              >
                                <Icon
                                  data={{
                                    name: name,
                                    size: "custom",
                                    color: "blue",
                                  }}
                                  className="h-auto w-7"
                                />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </Popover.Panel>
              </Transition>
            </div>
          </>
        )}
      </Popover>
    </div>
  );
});
