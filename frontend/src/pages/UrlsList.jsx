import { useEffect, useState } from "react";
import UrlCard from "../components/UrlCard";
import { useSelector , useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUrlsAPI } from "../apis/urls/getUrls";
import { setUrls as setUrlsList } from "../slices/urlsSlice";
import { useNavigate } from "react-router-dom";

const UrlsPage = () => {
    const token = useSelector((state)=>state.user.token)
    const dicpatch = useDispatch();
    const navigate = useNavigate()

  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);


  const linkFun = async (shortUrl) =>{
    console.log(shortUrl)
    // const res = await fetch(`http://localhost:8082/${shortUrl}`, { redirect: 'manual' })
    // if (res.status === 302) {
    //     const location = res.headers.get('Location');
    //     navigate(location);
    // }
  }


  useEffect(() => {
    const fetchUrls = async () => {
      try {
        console.log(token)
        const res = await getUrlsAPI(token)
        if(res?.success){
            const data = res?.data;
            setUrls(data);
            console.log(data)
            dicpatch(setUrlsList(urls))
            
        }
        
      } catch (err) {
        toast.error("Plz Login")
        console.error("Error fetching URLs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  if (!token) {
    return navigate('/login');
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your URLs</h2>

      {loading ? (
        <p className="text-gray-500">Loading URLs...</p>
      ) : urls.length === 0 ? (
        <p className="text-gray-500">No URLs found.</p>
      ) : (
        <div className="space-y-4" >
          {urls.map((url) => (
            <UrlCard
              key={url.id} // make sure this key exists
              name={url.name}
              shortUrl={url.shortUrl}
              createdAt={url.createdAt}
              onClick={()=>linkFun(url.shortUrl)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UrlsPage;
