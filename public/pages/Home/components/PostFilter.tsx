import "./PostFilter.scss";

import React from "react";
import { PostStatus } from "@fider/models";
import { DropDown, DropDownItem } from "@fider/components";
import { useFider } from "@fider/hooks";

interface PostFilterProps {
  activeView: string;
  countPerStatus: { [key: string]: number };
  viewChanged: (name: string) => void;
}

export const PostFilter = (props: PostFilterProps) => {
  const fider = useFider();

  const handleChangeView = (item: DropDownItem) => {
    props.viewChanged(item.value as string);
  };

  const options: DropDownItem[] = [
    { value: "trending", label: "В тренде" },
    { value: "recent", label: "Cвежее" },
    { value: "most-wanted", label: "Самое востребованное" },
    { value: "most-discussed", label: "Наиболее обсуждаемое" }
  ];

  if (fider.session.isAuthenticated) {
    options.push({ value: "my-votes", label: "С моим голосом" });
  }

  PostStatus.All.filter(s => s.filterable && props.countPerStatus[s.value]).forEach(s => {
    options.push({
      label: s.title,
      value: s.value,
      render: (
        <span>
          {s.title} <a className="counter">{props.countPerStatus[s.value]}</a>
        </span>
      )
    });
  });

  const viewExists = options.filter(x => x.value === props.activeView).length > 0;
  const activeView = viewExists ? props.activeView : "trending";

  return (
    <div>
      <span className="subtitle">View</span>
      <DropDown
        header="Показать"
        className="l-post-filter"
        inline={true}
        style="simple"
        items={options}
        defaultValue={activeView}
        onChange={handleChangeView}
      />
    </div>
  );
};
