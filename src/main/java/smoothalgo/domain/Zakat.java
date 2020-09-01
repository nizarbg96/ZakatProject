package smoothalgo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A Zakat.
 */
@Entity
@Table(name = "zakat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Zakat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "due_amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal dueAmount;

    @NotNull
    @Column(name = "remaining_amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal remainingAmount;

    @OneToMany(mappedBy = "zakat")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    @OneToOne(mappedBy = "zakat")
    @JsonIgnore
    private Period period;

    @ManyToOne
    @JsonIgnoreProperties("zakats")
    private ExtraUser extraUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getDueAmount() {
        return dueAmount;
    }

    public Zakat dueAmount(BigDecimal dueAmount) {
        this.dueAmount = dueAmount;
        return this;
    }

    public void setDueAmount(BigDecimal dueAmount) {
        this.dueAmount = dueAmount;
    }

    public BigDecimal getRemainingAmount() {
        return remainingAmount;
    }

    public Zakat remainingAmount(BigDecimal remainingAmount) {
        this.remainingAmount = remainingAmount;
        return this;
    }

    public void setRemainingAmount(BigDecimal remainingAmount) {
        this.remainingAmount = remainingAmount;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Zakat payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Zakat addPayments(Payment payment) {
        this.payments.add(payment);
        payment.setZakat(this);
        return this;
    }

    public Zakat removePayments(Payment payment) {
        this.payments.remove(payment);
        payment.setZakat(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Period getPeriod() {
        return period;
    }

    public Zakat period(Period period) {
        this.period = period;
        return this;
    }

    public void setPeriod(Period period) {
        this.period = period;
    }

    public ExtraUser getExtraUser() {
        return extraUser;
    }

    public Zakat extraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
        return this;
    }

    public void setExtraUser(ExtraUser extraUser) {
        this.extraUser = extraUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Zakat)) {
            return false;
        }
        return id != null && id.equals(((Zakat) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Zakat{" +
            "id=" + getId() +
            ", dueAmount=" + getDueAmount() +
            ", remainingAmount=" + getRemainingAmount() +
            "}";
    }
}
