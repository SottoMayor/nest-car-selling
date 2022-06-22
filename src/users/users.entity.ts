import { AfterInsert, AfterRemove, AfterUpdate, Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  /**
   * The id of user.
   * @example 1
  */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The email address registered
   * @example 'test@test.com'
  */
  @Column()
  email: string;

  /**
   * The hashed password
   * @example 011f2c167b90d8838c9d6f00963800b00eb8c276
   */
  @Column()
  password: string;

  /**
   * This user have powers of admin?
  */
  @Column({ default: false })
  admin: boolean;

  /**
   *  All reports associated with this user
  */
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert(){
    console.log("Inserted user with id", this.id);
  }
  
  @AfterUpdate()
  logUpdate(){
    console.log("Updated user with id", this.id);
  }
  
  @AfterRemove()
  logRemove(){
    console.log("Removed user with id", this.id);
  }
}
