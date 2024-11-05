import React from "react";
import Item from "./Item";

type Assignment = {
  name: string;
};

type ItemData = {
  title: string;
  linkText: string;
  count: number;
  assignments: Assignment[];
};

// Sample data
const data: ItemData[] = [
  {
    title: "Registered assignments",
    linkText: "See all",
    count: 4,
    assignments: [
      { name: "Sven Svensson" },
      { name: "The company AB" },
    ],
  },
  {
    title: "Employment agreement",
    linkText: "View pending",
    count: 2,
    assignments: [
      { name: "Erik Eriksson" },
      { name: "The company AB" },
    ],
  },
  {
    title: "Invoices",
    linkText: "See history",
    count: 5,
    assignments: [
      { name: "Olof Olsson" },
      { name: "The company AB" },
    ],
  },
  {
    title: "Salary specifications",
    linkText: "See history",
    count: 5,
    assignments: [
      { name: "Olof Olsson" },
      { name: "The company AB" },
    ],
  },
];

type Props = {};

export default function List({}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((item, index) => (
        <Item
          key={index}
          title={item.title}
          linkText={item.linkText}
          count={item.count}
          assignments={item.assignments}
        />
      ))}
    </div>
  );
}
