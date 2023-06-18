import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ToolsService {
  private rounds: number;
  constructor(private readonly configService: ConfigService) {
    this.initRounds();
  }

  async encrptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(this.encrptRounds));
    const enpw = await bcrypt.hash(password, salt);

    return enpw;
  }

  async validPassword(password: string, enpassword: string): Promise<boolean> {
    return await bcrypt.compare(password, enpassword);
  }

  public get uuid(): string {
    return uuidv4().replace(/-/g, '');
  }

  public get encrptRounds(): number {
    return this.rounds;
  }

  private initRounds() {
    const r = this.configService.get<number>('jwt.encryptRounds', 10);
    this.rounds =
      r > 5 && r < 15 ? r : Math.floor(Math.random() * (19 - 10) + 6);
  }
}
