import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import 'react-responsive-pagination/themes/bootstrap-light-dark.css';
import Layout from './components/common/Layout.jsx'
import Login from './components/pages/Login.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import ViewUser from './components/pages/ViewUser.jsx'
import ContactEnquiryMgmt from './components/pages/ContactEnquiryMgmt.jsx'
import NewsLetters from './components/pages/NewsLetters.jsx'
import ColorAdd from './components/pages/ColorAdd.jsx'
import ColorView from './components/pages/ColorView.jsx'
import MaterialAdd from './components/pages/MatierialAdd.jsx'
import ViewMaterial from './components/pages/MaterialView.jsx'
import CategoryAdd from './components/pages/CategoryAdd.jsx'
import CategoryView from './components/pages/CategoryView.jsx'
import SubCategoryAdd from './components/pages/SubCategoryAdd.jsx'
import SubCategoryView from './components/pages/SubCategoryView.jsx'
import SubSubCategoryAdd from './components/pages/SubSubCategoryAdd.jsx'
import SubSubCategoryView from './components/pages/SubSubCategoryView.jsx'
import ProductAdd from './components/pages/ProductAdd.jsx'
import ProductItems from './components/pages/ProductItems.jsx'
import WhyChooseUsAdd from './components/pages/WhyChooseUsAdd.jsx'
import WhyChooseUsView from './components/pages/WhyChooseUsView.jsx'
import Orders from './components/pages/Orders.jsx'
import SliderAdd from './components/pages/SliderAdd.jsx'
import SliderView from './components/pages/SliderView.jsx'
import CountryAdd from './components/pages/CountryAdd.jsx'
import CountryView from './components/pages/CountryView.jsx'
import TestimonialAdd from './components/pages/TestimonialAdd.jsx'
import TestimonialView from './components/pages/TestimonialView.jsx'
import FaqAdd from './components/pages/FaqAdd.jsx'
import FaqView from './components/pages/FaqView.jsx'
import { LoginProvider } from './components/context/MainContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Layout />}>
            <Route path={'/dashboard'} element={<Dashboard />} />
            <Route path={'/viewuser'} element={<ViewUser />} />
            <Route path={'/contactenquirymgmt'} element={<ContactEnquiryMgmt />} />
            <Route path={'/newsletter'} element={<NewsLetters />} />
            <Route path={'/editcolor/:id?'} element={<ColorAdd />} />
            <Route path={'/color/add'} element={<ColorAdd />} />
            <Route path={'/color/view'} element={<ColorView />} />
            <Route path={'/editmaterial/:id?'} element={<MaterialAdd />} />
            <Route path={'/material/add'} element={<MaterialAdd />} />
            <Route path={'/material/view'} element={<ViewMaterial />} />
            <Route path={'/editcategory/:id?'} element={<CategoryAdd />} />
            <Route path={'/category/add'} element={<CategoryAdd />} />
            <Route path={'/category/view'} element={<CategoryView />} />
            <Route path={'/editsubcategory/:id?'} element={<SubCategoryAdd />} />
            <Route path={'/subcategory/add'} element={<SubCategoryAdd />} />
            <Route path={'/subcategory/view'} element={<SubCategoryView />} />
            <Route path={'/editsubsubcategory/:id?'} element={<SubSubCategoryAdd />} />
            <Route path={'/subsubcategory/add'} element={<SubSubCategoryAdd />} />
            <Route path={'/subsubcategory/view'} element={<SubSubCategoryView />} />
            <Route path={'/editproduct/:id?'} element={<ProductAdd />} />
            <Route path={'/product/add'} element={<ProductAdd />} />
            <Route path={'/product/product-items'} element={<ProductItems />} />
            <Route path={'/editwhychooseus/:id?'} element={<WhyChooseUsAdd />} />
            <Route path={'/whychooseus/add'} element={<WhyChooseUsAdd />} />
            <Route path={'/whychooseus/view'} element={<WhyChooseUsView />} />
            <Route path={'/orders'} element={<Orders />} />
            <Route path={'/editslider/:id?'} element={<SliderAdd />} />
            <Route path={'/slider/add'} element={<SliderAdd />} />
            <Route path={'/slider/view'} element={<SliderView />} />
            <Route path={'/editcountry/:id?'} element={<CountryAdd />} />
            <Route path={'/country/add'} element={<CountryAdd />} />
            <Route path={'/country/view'} element={<CountryView />} />
            <Route path={'/edittestimonial/:id?'} element={<TestimonialAdd />} />
            <Route path={'/testimonial/add'} element={<TestimonialAdd />} />
            <Route path={'/testimonial/view'} element={<TestimonialView />} />
            <Route path={'/editfaq/:id?'} element={<FaqAdd />} />
            <Route path={'/faq/add'} element={<FaqAdd />} />
            <Route path={'/faq/view'} element={<FaqView />} />
          </Route>
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  </StrictMode>,
)
