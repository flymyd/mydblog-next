import React, {useRef, useEffect, useState} from "react";

interface Props {
  avatarUrl: string; // 用户选择的头像url
  text: string; // 用户输入的文字
}

const imageUrl = "/cat-bg.png"; // 固定的图片url

const MergeCanvas: React.FC<Props> = ({avatarUrl, text}) => {
  // const suffix = '?v=' + new Date().getTime();
  const suffix = '';
  const canvasRef = useRef<HTMLCanvasElement>(null); // 创建一个canvas引用
  const saveImg = () => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      // let image = new Image();
      // image.src = canvas.toDataURL({format: 'image/png', quality: 1, width: canvas.width, height: canvas.height});
      // let url = image.src.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      // window.open(url);
      // 创建一个 a 标签，并设置 href 和 download 属性
      const el = document.createElement('a');
      // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
      el.href = canvas.toDataURL();
      el.download = 'cat.png';

      // 创建一个点击事件并对 a 标签进行触发
      const event = new MouseEvent('click');
      el.dispatchEvent(event);

    }
  }
  useEffect(() => {
    const canvas = canvasRef.current; // 获取canvas元素
    if (canvas) {
      const ctx = canvas.getContext("2d"); // 获取canvas绘图上下文
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        const image = new Image(); // 创建一个图片对象
        image.src = imageUrl;
        image.crossOrigin = 'anonymous'
        const avatar = new Image();
        avatar.src = avatarUrl + suffix;
        avatar.crossOrigin = 'anonymous'
        image.onload = () => {
          const scale = Math.min(
            (window.innerWidth * 0.8) / image.width,
            (window.innerHeight * 0.8) / image.height
          ); // 计算缩放比例，使得图片能够适应屏幕大小
          canvas.width = image.width * scale; // 设置canvas的宽度为缩放后的图片宽度
          canvas.height = image.height * scale; // 设置canvas的高度为缩放后的图片高度
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 将图片绘制到画布上
          avatar.onload = () => {
            drawAvatar(ctx, canvas, avatar);
            drawText(ctx, canvas);
          };
        };
      }
    }
  }, [avatarUrl, text]); // 只在组件挂载时执行一次这个副作用函数

  // 定义一个函数，用于绘制头像
  const drawAvatar = (ctx: CanvasRenderingContext2D, canvas: any, avatar: HTMLImageElement) => {
    const avatarSize = Math.min(canvas.width, canvas.height) / 4; // 设置头像的大小为画布宽高的最小值的四分之一
    const avatarX = (canvas.width - avatarSize) / 1.1;
    const avatarY = (canvas.height - avatarSize) / 10; // 设置头像的纵坐标为画布中心
    ctx.save(); // 保存当前绘图状态
    ctx.beginPath(); // 开始一个新的路径
    ctx.arc(
      avatarX + avatarSize / 2,
      avatarY + avatarSize / 2,
      avatarSize / 2,
      0,
      Math.PI * 2
    ); // 绘制一个圆形路径，圆心为头像中心，半径为头像大小的一半
    ctx.clip(); // 将当前路径设为裁剪区域
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize); // 将头像绘制到裁剪区域内
    ctx.restore(); // 恢复之前保存的绘图状态
  };

  // 定义一个函数，用于绘制文字
  const drawText = (ctx: CanvasRenderingContext2D, canvas: any) => {
    const fontSize = Math.min(canvas.width, canvas.height) / 8; // 设置字体大小为画布宽高的最小值的二十分之一
    ctx.font = `${fontSize}px Arial`; // 设置字体样式
    ctx.fillStyle = "black"; // 设置字体颜色为白色
    ctx.textAlign = "center"; // 设置字体水平对齐方式为居中
    ctx.textBaseline = "bottom"; // 设置字体垂直对齐方式为底部对齐
    const textWidth = ctx.measureText(text).width; // 获取文字的宽度
    if (textWidth > canvas.width * 0.8) {
      text = text.slice(0, -3) + "..."; // 如果文字宽度超过画布宽度的80%，就截取前面部分，并加上省略号
    }
    ctx.fillText(text, canvas.width / 2, canvas.height * 0.95); // 将文字绘制到画布底部居中位置，留出5%的边距空间
  };

  return <div className="mb-10">
    <canvas ref={canvasRef}/>
    {(imageUrl || text) ? <button className="mt-5" onClick={() => saveImg()}>点击下载</button> : <></>}
  </div>; // 返回一个canvas元素，并将引用传递给它
};

export default MergeCanvas;
