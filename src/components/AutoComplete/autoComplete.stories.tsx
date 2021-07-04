import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete, DataSourceType } from "./autoComplete";

type userData = {
  login: string;
  url: string;
}
interface GithubUserProps {
  items: userData[]
}
type LakerPlayerProps = {
  number: number
}

const defaultAutoComplete = () => {
  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
  }
  return <AutoComplete fetchSuggestions={handleFetch} onSelect={action("selected")} placeholder="输入湖人队球员英文名试试" />
}

const autoDefineAutoComplete = () => {
  const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ] 
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>名字: {itemWithNumber.value}</b>
        <span>球衣号码: {itemWithNumber.number}</span>
      </>
    )
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      placeholder="输入湖人队球员英文,自定义下拉模版"
      renderOptions={renderOption}
    />
  )
}

const asyncAutoComplete = () => {
  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<userData>
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }
  const handleSuggestion = (key: string) => {
    return fetch(`https://api.github.com/search/users?q=${key}`)
    .then(res => res.json())
    .then((res: GithubUserProps) => {
      return res.items.map(item => ({
        value: item.login,
        url: item.url
      }));
    });
  }
  return (
    <AutoComplete 
      fetchSuggestions={handleSuggestion}
      onSelect={action('selected')}
      placeholder="输入 Github 用户名试试"
      renderOptions={renderOption}
    />
  )
}

storiesOf("AutoComplete component", module)
  .add("AutoComplete", defaultAutoComplete)
  .add("自定义下拉选项的 AutoComplete", autoDefineAutoComplete)
  .add("带有异步请求的 AutoComplete", asyncAutoComplete)
 