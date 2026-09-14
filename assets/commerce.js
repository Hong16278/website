const commerceProducts=await fetch('/data/products.json',{cache:'no-store'}).then(r=>r.ok?r.json():[]).catch(()=>[]);
const commerceByName=new Map(commerceProducts.map(product=>[product.name,product]));
function commerceButton(product){const button=document.createElement('a');button.className='btn btn-secondary taobao-buy';button.href=product.purchaseUrl;button.target='_blank';button.rel='noopener noreferrer';button.textContent='前往淘宝购买';return button}
function updateCommerce(){
  document.querySelectorAll('.brand').forEach(brand=>{if(brand.dataset.fullLogoApplied)return;const logo=document.createElement('span');logo.className='brand-full-logo';logo.setAttribute('aria-label','Lucas 软件开发');for(const className of ['lucas-symbol','lucas-word','lucas-cn']){const part=document.createElement('span');part.className=className;part.setAttribute('aria-hidden','true');logo.append(part)}brand.replaceChildren(logo);brand.dataset.fullLogoApplied='true'});
  document.querySelectorAll('a[href*="item.taobao.com"]').forEach(link=>{if(link.dataset.taobaoApplied)return;link.textContent='前往淘宝购买';link.classList.add('taobao-buy');link.dataset.taobaoApplied='true'});
  const name=document.querySelector('.detail-hero h1')?.textContent?.trim(),product=commerceByName.get(name);
  if(product?.pricing){
    const lead=document.querySelector('.detail-lead');
    if(lead&&!document.querySelector('.detail-price')){const price=document.createElement('p');price.className='product-price detail-price';price.textContent=`授权价格：${product.pricing}`;lead.after(price)}
    const panel=document.querySelector('.side-panel');
    if(panel&&!panel.querySelector('.side-price')){const price=document.createElement('p');price.className='side-price';price.textContent=product.pricing;panel.querySelector('dl')?.after(price)}
    const actions=document.querySelector('.detail-hero .hero-actions');
    if(product.purchaseUrl&&actions&&!actions.querySelector('a[href*="item.taobao.com"]')) actions.append(commerceButton(product));
    if(!product.purchaseUrl&&panel&&!panel.querySelector('.purchase-pending')){const note=document.createElement('p');note.className='notice purchase-pending';note.textContent='淘宝购买链接准备中，如需购买请联系支持。';panel.querySelector('.side-help')?.before(note)}
  }
  document.querySelectorAll('.download-row').forEach(row=>{const rowProduct=commerceByName.get(row.querySelector('h2')?.textContent?.trim());if(!rowProduct?.pricing||row.querySelector('.product-price'))return;const price=document.createElement('p');price.className='product-price';price.textContent=rowProduct.pricing;row.querySelector('.download-info')?.append(price);if(rowProduct.purchaseUrl)row.querySelector('.download-action')?.prepend(commerceButton(rowProduct))});
  const contact=document.querySelector('#contact');
  if(contact&&!contact.querySelector('.support-email')){const line=document.createElement('p');line.className='support-email';line.append('软件售后与购买咨询：');const mail=document.createElement('a');mail.href='mailto:1627859755@qq.com';mail.textContent='1627859755@qq.com';line.append(mail);contact.querySelector('p')?.after(line)}
}
new MutationObserver(updateCommerce).observe(document.getElementById('app'),{childList:true,subtree:true});
updateCommerce();
