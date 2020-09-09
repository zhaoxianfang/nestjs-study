import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("mobile", ["mobile"], { unique: true })
@Entity("km_user", { schema: "km_volunteer" })
export class KmUser extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", comment: "姓名", length: 30 })
  username: string;

  @Column("varchar", { name: "nickname", comment: "昵称", length: 40 })
  nickname: string;

  @Column("varchar", { name: "password", comment: "密码", length: 70 })
  password: string;

  @Column("varchar", { name: "salt", length: 10 })
  salt: string;

  @Column("varchar", {
    name: "avatar",
    nullable: true,
    comment: "头像",
    length: 150,
  })
  avatar: string | null;

  @Column("tinyint", {
    name: "gender",
    comment: "性别：0未知1男2女",
    default: () => "'1'",
  })
  gender: number;

  @Column("varchar", {
    name: "mobile",
    unique: true,
    comment: "手机号码",
    length: 15,
  })
  mobile: string;

  @Column("int", { name: "create_time", comment: "创建时间" })
  create_time: number;

  @Column("varchar", {
    name: "last_login_ip",
    nullable: true,
    comment: "最后登录IP",
    length: 70,
  })
  last_login_ip: string | null;

  @Column("int", {
    name: "last_login_time",
    nullable: true,
    comment: "最后登录时间",
  })
  last_login_time: number | null;

  @Column("tinyint", {
    name: "status",
    comment: "用户状态：-1删除;1正常;2冻结",
    default: () => "'1'",
  })
  status: number;
}
