interface ITag {
  tag: string;
  slug: string;
}

interface ITagsList {
  tagSelected: (tag: string) => Promise<void>;
}
