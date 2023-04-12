import styles from "@/styles/PageTitle.module.scss";
import FluidWrapper from "@/components/layouts/FluidWrapper";

const PageTitle = (props: { title: string, subtitle?: string }) => {
  return (
    <div className="bg-white">
      <FluidWrapper>
        <div className={styles['page-title']}>
          <h2 className={styles['page-title__title']}>{props.title}</h2>
          {props.subtitle ?
            <h5 className={styles['page-title__subtitle']}>{props.subtitle}</h5> : <></>}
        </div>
      </FluidWrapper>
    </div>
  )
}
export default PageTitle;
