const { LitElement, html, css } = require('lit')
const { commonCss, displayScreen } = require('./components/common')

class PlayScreen extends LitElement {
  static get styles () {
    return css`
      ${commonCss}
      .title {
        top: 12px;
      }

      .edit-boxes {
        position: absolute;
        top: 59px;
        left: 50%;
        display: flex;
        flex-direction: column;
        gap: 14px 0;
        transform: translate(-50%);
        width: 310px;
      }

      .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 0 4px;
      }

      .button-wrapper {
        display: flex;
        flex-direction: row;
        gap: 0 4px;
        position: absolute;
        bottom: 9px;
        left: 50%;
        transform: translate(-50%);
        width: 310px;
      }

      .extra-info-bv {
        font-size: 10px;
        color: rgb(206, 206, 206);
        text-shadow: 1px 1px black;
        position: absolute;
        left: calc(50% + 2px);
        bottom: -34px;
      }
    `
  }

  static get properties () {
    return {
      server: { type: String },
      serverport: { type: Number },
      proxy: { type: String },
      proxyport: { type: Number },
      username: { type: String },
      password: { type: String },
      version: { type: String }
    }
  }

  constructor () {
    super()
    this.username = window.localStorage.getItem('username') ?? 'pviewer' + (Math.floor(Math.random() * 1000))
    this.password = window.localStorage.getItem('password') ?? ''
    window.fetch('config.json').then(res => res.json()).then(config => {
      this.server = window.localStorage.getItem('server') ?? config.defaultHost
      this.serverport = window.localStorage.getItem('serverport') ?? config.defaultHostPort ?? 25565
      this.proxy = window.localStorage.getItem('proxy') ?? config.defaultProxy
      this.proxyport = window.localStorage.getItem('proxyport') ?? (!config.defaultProxy && !config.defaultProxyPort ? '' : config.defaultProxyPort ?? 443)
      this.version = window.localStorage.getItem('version') ?? config.defaultVersion
    })
  }

  render () {
    return html`
      <div class="dirt-bg"></div>

      <p class="title">加入服务器</p>

      <main class="edit-boxes">
        <div class="wrapper">
          <pmui-editbox
            pmui-width="150px"
            pmui-label="玩家名称"
            pmui-id="username"
            pmui-value="${this.username}"
            @input=${e => { this.username = e.target.value }}
          ></pmui-editbox>
          <pmui-editbox
            pmui-width="150px"
            pmui-label="游戏版本"
            pmui-id="botversion"
            pmui-value="${this.version}"
            @input=${e => { this.version = e.target.value }}
          ></pmui-editbox>
        </div>
        <p class="extra-info-bv">留空将自动选择。</p>
      </main>

      <div class="button-wrapper">
        <pmui-button pmui-width="150px" pmui-label="快速连接" @pmui-click=${this.onConnectPress}></pmui-button>
        <pmui-button pmui-width="150px" pmui-label="取消" @pmui-click=${() => displayScreen(this, document.getElementById('title-screen'))}></pmui-button>
      </div>
    `
  }

  onConnectPress () {
    window.localStorage.setItem('username', this.username)
    window.localStorage.setItem('password', this.password)
    window.localStorage.setItem('server', this.server)
    window.localStorage.setItem('serverport', this.serverport)
    window.localStorage.setItem('proxy', this.proxy)
    window.localStorage.setItem('proxyport', this.proxyport)
    window.localStorage.setItem('version', this.version)

    this.dispatchEvent(new window.CustomEvent('connect', {
      detail: {
        server: `${this.server}:${this.serverport}`,
        proxy: `${this.proxy}${this.proxy !== '' ? `:${this.proxyport}` : ''}`,
        username: this.username,
        password: this.password,
        botVersion: this.version
      }
    }))
  }
}

window.customElements.define('pmui-playscreen', PlayScreen)
