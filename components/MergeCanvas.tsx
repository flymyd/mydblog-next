import React, {useRef, useEffect} from "react";
import {Button} from "@fluentui/react-components";

interface Props {
  avatarUrl: string;
  text: string;
}

const imageUrl = "/cat-bg.png";
const MergeCanvas: React.FC<Props> = ({avatarUrl, text}) => {
  // const suffix = '?v=' + new Date().getTime();
  const suffix = '';
  const canvasRef = useRef<HTMLCanvasElement>(null); // 创建一个canvas引用
  const saveImg = () => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      const el = document.createElement('a');
      el.href = canvas.toDataURL();
      el.download = 'cat.png';
      const event = new MouseEvent('click');
      el.dispatchEvent(event);

    }
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
        const image = new Image();
        image.src = imageUrl;
        image.crossOrigin = 'anonymous'
        const avatar = new Image();
        avatar.src = avatarUrl + suffix;
        avatar.crossOrigin = 'anonymous'
        image.onload = () => {
          const ratio = 0.7;
          const fluidRatio = window.innerWidth < 768 ? 1 : 980 / window.innerWidth;
          const scale = Math.min(
            (window.innerWidth * ratio * fluidRatio) / image.width,
            (window.innerHeight * ratio * fluidRatio) / image.height
          );
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
  }, [avatarUrl, text]);

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

  const drawText = (ctx: CanvasRenderingContext2D, canvas: any) => {
    const fontSize = Math.min(canvas.width, canvas.height) / 8;
    ctx.font = `${fontSize}px Arial`; // 字体样式
    ctx.fillStyle = "black";
    ctx.textAlign = "center"; // 字体水平对齐方式
    ctx.textBaseline = "bottom"; // 字体垂直对齐方式
    const textWidth = ctx.measureText(text).width; // 获取文字的宽度
    if (textWidth > canvas.width * 0.8) {
      text = text.slice(0, -3) + "..."; // 如果文字宽度超过画布宽度的80%，就截取前面部分，并加上省略号
    }
    ctx.fillText(text, canvas.width / 2, canvas.height * 0.95); // 将文字绘制到画布底部居中位置，留出5%的边距空间
  };

  return <div className="mb-10">
    <canvas ref={canvasRef}/>
    {(imageUrl || text) ?
      <div className="mt-5">
        <Button appearance="primary" onClick={() => saveImg()}>点击下载</Button>
      </div> : <></>}
  </div>;
};

export default MergeCanvas;
