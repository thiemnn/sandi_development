import SearchProductSection from './sections/SearchProductSection'
import { useRouter } from 'next/router'

export default function SearchProduct() {
  const router = useRouter()
  var search = router.query.search
  var category_id = router.query.category_id
  var opt1 = router.query.opt1 == undefined ? false : router.query.opt1
  var opt2 = router.query.opt2 == undefined ? false : router.query.opt2
  var opt3 = router.query.opt3 == undefined ? false : router.query.opt3
  if(search){
    return (
      <>
        <SearchProductSection search={search} category_id={category_id} opt_1={opt1} opt_2={opt2} opt_3={opt3}/>
      </>
    );
  } else{
    return(
      <></>
    )
  }
  
}
