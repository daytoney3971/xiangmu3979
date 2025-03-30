import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay';

const ProductPage = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // 使用实际部署的 API 地址
        const response = await fetch(`https://xiangmu3979.vercel.app/api/products/${id}`);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('获取产品数据失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!productData) {
    return <div>未找到产品</div>;
  }

  return <ProductDisplay {...productData} />;
};

export default ProductPage;